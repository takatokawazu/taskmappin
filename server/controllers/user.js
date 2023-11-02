const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ errorMessage: 'Please enter all required fields.' });
  }

  if (password.length < 6)
    return res.status(400).json({
      errorMessage: 'Please enter enter a password of at lease 6 charcters.',
    });

  const exitingUser = await User.findOne({ email });

  if (exitingUser)
    return res.status(400).json({
      errorMessage: 'An account with this email already exists',
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();

  const token = jwt.sign(
    {
      user: user._id,
    },
    process.env.JWT_SECRET
  );

  res
    .cookie('token', token, {
      httpOnly: true,
    })
    .status(200)
    .json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ errorMessage: 'Please enter all required fields.' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ errorMessage: 'Wrong username or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ errorMessage: 'Wrong username or password' });
  }

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    process.env.JWT_SECRET
  );
  res
    .cookie('token', token, {
      httpOnly: true,
    })
    .json({ token, user });
};

const loggedIn = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(req.cookies.token);
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    // console.log(err.errorMessage);
    console.log(err);
    res.json(err);
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

const getUserByName = async (req, res) => {
  const user = await User.findOne({ username: req.params.user })
    .populate({
      path: 'createdTasks',
      populate: [
        {
          path: 'assignedUser',
          select: 'username',
        },
        {
          path: 'completedBy',
          select: 'username',
        },
      ],
    })
    .populate({
      path: 'assignedTasks',
      populate: [
        {
          path: 'assignedUser',
          select: 'username',
        },
        {
          path: 'completedBy',
          select: 'username',
        },
      ],
    })
    .populate({
      path: 'completedTasks',
      populate: [
        {
          path: 'completedBy',
          select: 'username',
        },
        {
          path: 'assignedUser',
          select: 'username',
        },
      ],
    });
  if (!user) {
    return res.status(400).json({ error: 'Wrong username or password' });
  }
  res.status(200).json(user);
};

module.exports = {
  registerUser,
  loginUser,
  loggedIn,
  getUserById,
  getUserByName,
};
