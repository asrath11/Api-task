const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  userId: new Object(),
  otp: String,
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  expiredAt: {
    type: Date,
  },
});

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;
