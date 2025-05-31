const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

// JWT secret keys
const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  'your-super-secret-refresh-key-change-in-production';

// Token expiration times
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';

// Generate access token
const generateAccessToken = payload =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });

// Generate refresh token
const generateRefreshToken = payload =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });

// Verify access token
const verifyAccessToken = token => jwt.verify(token, JWT_SECRET);

// Verify refresh token
const verifyRefreshToken = token => jwt.verify(token, JWT_REFRESH_SECRET);

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.accessToken || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required',
      });
    }

    const decoded = verifyAccessToken(token);

    // Verify session is still active
    const session = await Session.findOne({
      sessionId: decoded.sessionId,
      isActive: true,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session',
      });
    }

    // Get user
    const user = await User.findById(decoded.userId).select('-password');
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive',
      });
    }

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

// Authorization middleware for specific roles
const authorize = (roles = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  if (roles.length && !roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Insufficient permissions',
    });
  }

  next();
};

// Optional authentication (allows both authenticated and anonymous users)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies.accessToken || (authHeader && authHeader.split(' ')[1]);

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = verifyAccessToken(token);

    const session = await Session.findOne({
      sessionId: decoded.sessionId,
      isActive: true,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      req.user = null;
      return next();
    }

    const user = await User.findById(decoded.userId).select('-password');
    if (!user || !user.isActive) {
      req.user = null;
      return next();
    }

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authenticate,
  authorize,
  optionalAuth,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
};
