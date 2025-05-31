const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/aio-react-nodejs-auth';

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');

    // Create default admin user if none exists
    const User = require('../models/User');

    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const defaultAdmin = new User({
        email: 'admin@example.com',
        password: 'admin123', // Let the User model's pre-save hook handle hashing
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        isActive: true,
        emailVerified: true,
        lastLogin: new Date(),
      });

      await defaultAdmin.save();
      console.log('Default admin user created: admin@example.com / admin123');
    }
  } catch (error) {
    console.warn(
      'MongoDB connection failed - Authentication features disabled:',
      error.message,
    );
    // Don't exit, continue without database
    global.mongodbDisabled = true;
  }
};

module.exports = connectDB;
