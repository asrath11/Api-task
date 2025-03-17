const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const protect = async (req, res, next) => {
  try {
    const tokenHeader = req.headers['authorization'];
    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'Failed',
        message: 'Access denied! No token provided',
      });
    }

    const token = tokenHeader.split(' ')[1]; // Extract token after "Bearer"
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'Failed',
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'Failed',
      message: 'Invalid or expired token',
    });
  }
};

const restrictTo = (...users) => {
  return function (_req, res, next) {
    if (users.includes('Admin')) {
      next();
    } else {
      return res.status(401).json({
        status: 'Failed',
        message: 'You have no permission to access this resource',
      });
    }
  };
};

module.exports = { protect, restrictTo };
