const express = require('express');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const Session = require('../models/Session');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Rate limiting for user management
const userManagementLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per window
  message: {
    success: false,
    message: 'Too many requests, please try again later',
  },
});

// Apply authentication and admin authorization to all routes
router.use(authenticate);
router.use(authorize(['admin']));
router.use(userManagementLimiter);

// Get all users with pagination and search
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      role = '',
      isActive = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    // Build query
    const query = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (isActive !== '') {
      query.isActive = isActive === 'true';
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const pageNum = Math.max(1, parseInt(page));
    const pageSize = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * pageSize;

    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select('-password -emailVerificationToken -passwordResetToken')
        .sort(sort)
        .skip(skip)
        .limit(pageSize)
        .lean(),
      User.countDocuments(query),
    ]);

    // Add virtual fields
    const usersWithVirtuals = users.map(user => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      isLocked: !!(user.lockUntil && user.lockUntil > Date.now()),
    }));

    const totalPages = Math.ceil(totalUsers / pageSize);

    res.json({
      success: true,
      users: usersWithVirtuals,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalUsers,
        pageSize,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -emailVerificationToken -passwordResetToken')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Add virtual fields
    const userWithVirtuals = {
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      isLocked: !!(user.lockUntil && user.lockUntil > Date.now()),
    };

    res.json({
      success: true,
      user: userWithVirtuals,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'user' } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      role,
      emailVerified: true, // Admin created users are auto-verified
    });

    await user.save();

    // Return user without password
    const userResponse = await User.findById(user._id)
      .select('-password -emailVerificationToken -passwordResetToken')
      .lean();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        ...userResponse,
        fullName: `${userResponse.firstName} ${userResponse.lastName}`,
        isLocked: false,
      },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
    });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, role, isActive } = req.body;
    const userId = req.params.id;

    // Validation
    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name are required',
      });
    }

    if (role && !['admin', 'user'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified',
      });
    }

    // Prevent admin from deactivating their own account
    if (userId === req.user._id.toString() && isActive === false) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account',
      });
    }

    // Prevent admin from changing their own role
    if (userId === req.user._id.toString() && role && role !== req.user.role) {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own role',
      });
    }

    const updateData = { firstName, lastName };
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    })
      .select('-password -emailVerificationToken -passwordResetToken')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // If user is deactivated, invalidate all their sessions
    if (isActive === false) {
      await Session.updateMany({ userId }, { isActive: false });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      user: {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        isLocked: !!(user.lockUntil && user.lockUntil > Date.now()),
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
    });
  }
});

// Reset user password
router.post('/:id/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.params.id;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Invalidate all user sessions except current admin session
    await Session.updateMany(
      {
        userId,
        sessionId: { $ne: req.session.sessionId },
      },
      { isActive: false },
    );

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password',
    });
  }
});

// Unlock user account
router.post('/:id/unlock', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Reset login attempts and unlock
    await user.resetLoginAttempts();

    res.json({
      success: true,
      message: 'User account unlocked successfully',
    });
  } catch (error) {
    console.error('Unlock user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unlock user account',
    });
  }
});

// Delete user (soft delete by deactivating)
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting their own account
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true },
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Invalidate all user sessions
    await Session.updateMany({ userId }, { isActive: false });

    res.json({
      success: true,
      message: 'User deactivated successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    });
  }
});

// Get user statistics
router.get('/admin/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      activeUsers,
      adminUsers,
      regularUsers,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'admin', isActive: true }),
      User.countDocuments({ role: 'user', isActive: true }),
      User.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        adminUsers,
        regularUsers,
        recentUsers,
        inactiveUsers: totalUsers - activeUsers,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
    });
  }
});

module.exports = router;
