const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.showRegister = (req, res) => res.render('register');
exports.showLogin = (req, res) => res.render('login');
exports.showForgot = (req,res) => res.render('forgot');

exports.register = async (req,res) => {
  try {
    const { username, email, phone, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, phone, password: hashed });
    res.redirect('/login');
  } catch (err) {
    res.render('register', { error: 'Username or email already exists' });
  }
};

exports.login = async (req,res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render('login', { error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render('login', { error: 'Invalid credentials' });

  req.session.user = { id: user._id, username: user.username, email: user.email };
  res.redirect('/');
};

exports.logout = (req,res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

// forgot/reset (simple - prints link to console)
exports.handleForgot = async (req,res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render('forgot', { message: 'If email exists we sent a reset link' });
  const token = user.generatePasswordReset();
  await user.save();
  const resetLink = `${req.protocol}://${req.get('host')}/reset/${token}`;
  console.log('Reset link:', resetLink);
  res.render('forgot', { message: 'Reset link generated (check server console in dev)' });
};

exports.showReset = async (req,res) => {
  const { token } = req.params;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }});
  if (!user) return res.send('Token invalid or expired');
  res.render('reset', { token });
};

exports.handleReset = async (req,res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }});
  if (!user) return res.send('Token invalid or expired');
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.redirect('/login');
};
