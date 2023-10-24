const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secretKey = 'abcdefghi';

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
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: 'Wrong username or password' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: 'Wrong username or password' });
    }

    // ユーザーが正常に認証された場合、JWTを生成
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      secretKey
    );

    // JWTをクライアントに返信
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid ObjectId');
  }
  const user = await User.findById(userId)
    .populate('createdTasks')
    .populate('assignedTasks')
    .populate('completedTasks');
  if (!user) {
    return res.status(404).send('User not found');
  }

  const userObject = user.toObject();
  delete userObject.password;

  res.status(200).json(userObject);
};

module.exports = { registerUser, loginUser, getUserById };
