const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.send({ success: true, users });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates.password; // Prevent password update here
    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found.' });
    }
    res.send({ success: true, user });
  } catch (e) {
    res.status(400).send({ success: false, message: e.message });
  }
};