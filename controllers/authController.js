const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('../config/keys');
const nodemailer = require('nodemailer');

// Generate JWT Token
const generateToken = (payload) => {
  return jwt.sign(payload, keys.jwtSecret, { expiresIn: '1h' });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
// const sendOTPEmail = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: keys.emailUser,
//       pass: keys.emailPass,
//     },
//   });

//   const mailOptions = {
//     from: keys.emailUser,
//     to: email,
//     subject: 'Password Reset OTP',
//     text: `Your OTP for password reset is ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);
// };

// Register User
exports.registerUser = async (req, res) => {
  const { name, username, email, password, phone, profilePicture, role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    user = new User({
      name,
      username,
      email,
      password,
      phone,
      profilePicture,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = generateToken(payload);

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Request OTP for Password Reset
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const otp = generateOTP();
    user.resetOTP = otp;
    user.resetOTPExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // await sendOTPEmail(email, otp);

    // Log the OTP for debugging purposes
    console.log(`OTP for ${email}: ${otp}`);

    res.json({ msg: 'OTP sent to email' });
  } catch (err) {
    console.error('Error in requestPasswordReset:', err.message);
    res.status(500).send('Server error');
  }
};

// Verify OTP and Reset Password
exports.verifyOTPAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    if (user.resetOTP !== otp || user.resetOTPExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;

    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error('Error in verifyOTPAndResetPassword:', err.message);
    res.status(500).send('Server error');
  }
};

// Retrieve Username
exports.retrieveUsername = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (err) {
    console.error('Error in retrieveUsername:', err.message);
    res.status(500).send('Server error');
  }
};
