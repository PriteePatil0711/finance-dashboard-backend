const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const normalizedRole = (role || 'viewer').toLowerCase();
    const user = new User({ name, email, password: hashedPassword, role: normalizedRole });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ success: true, user, token });
  } catch (e) {
    if (e.code === 11000 && e.keyValue && e.keyValue.email) {
      return res.status(400).send({ success: false, message: 'Email already exists.' });
    }
    res.status(400).send({ success: false, message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, status: 'active' });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ success: false, message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ success: true, user, token });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
};