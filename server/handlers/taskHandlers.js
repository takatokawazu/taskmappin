const Task = require('../models/Task');
const User = require('../models/User');

const registerTask = async (data, io) => {
  try {
    const user = await User.findOne({ username: data.createdBy });
    const assignedUser = await User.findOne({
      username: data.assignedUser,
    });
    if (!user || !assignedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userId = user._id;
    const assignedUserId = assignedUser._id;
    const newTask = new Task({
      createdBy: data.createdBy,
      title: data.title,
      desc: data.desc,
      coords: data.coords,
      assignedUser: assignedUserId,
      auther: userId,
      deadline: data.deadline,
    });

    const savedTask = await newTask.save();

    user.createdTasks.push(savedTask._id);
    await user.save();
    assignedUser.assignedTasks.push(savedTask._id);
    await assignedUser.save();
    broadCastAddTask(savedTask, io);
  } catch (err) {
    console.log(err);
  }
};

const completeTask = async (data, username, io) => {
  // console.log(data);
  // console.log('~~~~~~~~~~~~~');
  try {
    const taskId = data._id;
    const name = username.username;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const user = await User.findOne({ username: name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    task.completedBy = user._id;
    task.isDone = true;
    await task.save();

    user.completedTasks.push(task._id);
    await user.save();
    broadCastCompleteTask(task, io);
  } catch (err) {
    console.log(err);
  }
};

const broadCastAddTask = (data, io) => {
  io.to('logged-users').emit('add-task', data);
};

const broadCastCompleteTask = (data, io) => {
  io.to('logged-users').emit('complete-task', data);
};

module.exports = { registerTask, completeTask };
