const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Otp = require('./../models/otpModel');
const { createToken } = require('../utilities/createJwtToken');
const { generateOtp } = require('../utilities/otpUtilities');
const sendEmail = require('../utilities/sendEmail');
const asyncHandler = require('../utilities/asyncHandler');

exports.signUp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user_type = req.body.user_type || 1;

  if (!email || !password) {
    const err = new Error('Please provide email and password');
    err.statusCode = 400;
    throw err;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error('Email already in use');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.create({ email, password, user_type });
  const { accessToken, refreshToken } = await createToken(user, res);

  res.status(201).json({
    status: 'Success',
    message: 'User created',
    accessToken,
    refreshToken,
  });
});

exports.signIn = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    const err = new Error('Email required');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email }).select('-password');
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  const { accessToken, refreshToken } = await createToken(user, res);
  await Otp.deleteMany({ userId: user._id });

  const otpToken = generateOtp();
  await Otp.create({
    userId: user._id,
    otp: otpToken,
    expiredAt: Date.now() + 300000,
  });

  await sendEmail.sendOtpToEmail(email, otpToken);
  res.json({ status: 'Success', message: 'OTP sent', accessToken });
});

exports.refreshToken = asyncHandler(async function (req, res) {
  const refreshToken = req.cookies['X-RefreshToken']; // Accessing the cookie
  if (!refreshToken) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Refresh token is required',
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({
        status: 'Failed',
        message: 'User not found',
      });
    }

    // Validate refresh token
    if (refreshToken !== user.refreshToken) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid refresh token',
      });
    }

    // Handle token creation securely and refresh the tokens
    const { accessToken, refreshToken: newRefreshToken } = await createToken(
      user,
      res
    );

    res.json({
      status: 'Success',
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Failed',
      message: 'Failed to refresh access token',
    });
  }
});

exports.logout = asyncHandler(async function (req, res) {
  const { refreshToken } = req.cookies;

  // Invalidate the refresh token in the database
  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null; // Clear refresh token from the user's record
      await user.save();
    }
  }

  res.clearCookie('X-AccessToken');
  res.clearCookie('X-RefreshToken'); // Clear the refresh token too if you set it
  res.status(204).json({
    message: 'Successfully logged out',
  });
});
