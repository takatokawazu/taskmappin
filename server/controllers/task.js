const Task = require('../models/Task');
const User = require('../models/User');

const registerTask = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.createdBy });
    const assignedUser = await User.findOne({
      username: req.body.assignedUser,
    });
    if (!user || !assignedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;
    const assignedUserId = assignedUser._id;
    const newTask = new Task({
      createdBy: req.body.createdBy,
      title: req.body.title,
      desc: req.body.desc,
      coords: req.body.coords,
      assignedUser: assignedUserId,
      auther: userId,
      deadline: req.body.deadline,
    });

    const savedTask = await newTask.save();

    user.createdTasks.push(savedTask._id);
    await user.save();
    assignedUser.assignedTasks.push(savedTask._id);
    await assignedUser.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate('assignedUser')
    .populate('auther')
    .populate('completedBy');
  res.status(200).json(tasks);
};

module.exports = { registerTask, getAllTasks };
