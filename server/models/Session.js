const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const SessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Index for performance and cleanup
SessionSchema.index({ userId: 1 });
SessionSchema.index({ sessionId: 1 });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to cleanup expired sessions
SessionSchema.statics.cleanupExpired = function() {
  return this.deleteMany({
    $or: [{ expiresAt: { $lt: new Date() } }, { isActive: false }],
  });
};

module.exports = mongoose.model('Session', SessionSchema);
