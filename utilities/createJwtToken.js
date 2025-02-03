const jwt = require('jsonwebtoken');
const env = require('dotenv');
const User = require('../models/userModel');
env.config({
  path: 'config.env',
});

// Create JWT token
async function createToken(user, res) {
  // Create Access Token
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // e.g. 15m
    }
  );

  // Create Refresh Token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // e.g. 7d
    }
  );

  // Store the refresh token in the user's record in the database
  user.refreshToken = refreshToken; // Save the refresh token to the user's record
  await user.save(); // Save the updated user record with the refresh token

  // Options for cookies
  const options = {
    httpOnly: true, // Prevent client-side JS from accessing the token
  };

  // Set the access token in a cookie
  res.cookie('X-AccessToken', accessToken, options);

  // Set the refresh token in a cookie
  res.cookie('X-RefreshToken', refreshToken, options);

  return { accessToken, refreshToken };
}

module.exports = { createToken };
