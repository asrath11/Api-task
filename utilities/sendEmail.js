const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const ejs = require('ejs');
dotenv.config({
  path: 'config.env',
});
async function sendOtpToEmail(email, otp) {
  const emailHtml = await ejs.renderFile(
    path.join(__dirname, '../views/email/otp.ejs'),
    { otp }
  );
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    html: emailHtml,
  };

  try {
    // Sending the email
    await transporter.sendMail(mailOptions);
    console.log('✅ OTP Email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending OTP email:', error); // Throw an error if email sending fails
  }
}

module.exports = { sendOtpToEmail };
