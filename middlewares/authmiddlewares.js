//middleware to check token
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
protect = async function (req, res, next) {
  const tokenHeader = req.headers['authorization'];
  if (tokenHeader) {
    const token = tokenHeader.split(' ')[1]; // Extract token after "Bearer"
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let user = await User.findById(decoded.id);
    req.user = user;
    next();
  } else {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please login to get access',
    });
  }
};

restrictTo = function (req, res, next) {
  if (req.user.user_type == 2) {
    next();
  }
  return res.status(200).json({
    status: 'Failed',
    message: 'You have no access to this resource',
  });
};

module.exports = { protect, restrictTo };
