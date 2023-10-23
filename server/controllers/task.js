const Task = require('../models/Task');
const User = require('../models/User');

const registerTask = async (req, res) => {
  const user = await User.findOne({ username: req.body.createdBy });
  const assignedUser = await User.findOne({
    username: req.body.assignedUser,
  });
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
  res.status(201).json(savedTask);
};

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

module.exports = { registerTask, getAllTasks };
