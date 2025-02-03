const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Otp = require('./../models/otpModel');
const { createToken } = require('../utilities/createJwtToken');
const { generateOtp } = require('../utilities/otpUtilities');
const sendEmail = require('../utilities/sendEmail');

exports.signUp = async function (req, res) {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Please provide email and password',
      });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Email already in use',
      });
    }

    const user = await User.create({ email, password });

    // Handle token creation securely and include refreshToken
    const { accessToken, refreshToken } = await createToken(user, res); // Ensure res is passed here
    return res.status(201).json({
      status: 'Success',
      message: 'User successfully created',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: error.message,
    });
  }
};

exports.signIn = async function (req, res) {
  let { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ status: 'Failed', message: 'Please provide email' });
  }

  let user = await User.findOne({ email }).select('-password');
  if (!user) {
    return res.status(400).json({ status: 'Failed', message: 'User not found' });
  }

  // Handle token creation securely and include refreshToken
  const { accessToken, refreshToken } = await createToken(user, res);

  // Delete any existing OTP for this user before creating a new one
  await Otp.deleteMany({ userId: user._id, expiredAt: { $gt: Date.now() } });

  let otpToken = generateOtp();
  const otpExpiration = Date.now() + 300000; // OTP expires in 5 minutes

  await Otp.create({
    userId: user._id,
    otp: otpToken,
    expiredAt: otpExpiration,
  });

  // Send OTP via email
  await sendEmail.sendOtpToEmail(email, otpToken);

  return res.status(200).json({
    status: 'Success',
    message: 'OTP sent to email',
    accessToken,
  });
};

exports.refreshToken = async function (req, res) {
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
};

exports.logout = async function (req, res) {
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
};
