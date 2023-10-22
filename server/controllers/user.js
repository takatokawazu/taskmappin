const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  res.status(200).json(user);
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).json({ error: 'Wrong username or password' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res.status(400).json({ error: 'Wrong username or password' });

  res.status(200).json({ _id: user._id, username: user.username });
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid ObjectId');
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.status(200).json(user);
};

module.exports = { registerUser, loginUser, getUserById };
