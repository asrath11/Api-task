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

const restrictTo = (req, res, next) => {
  if (req.user && req.user.user_type === 2) {
    return next();
  }
  return res.status(403).json({
    status: 'Failed',
    message: 'You have no access to this resource',
  });
};

module.exports = { protect, restrictTo };
