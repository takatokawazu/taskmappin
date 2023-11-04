const Task = require('../models/Task');
const User = require('../models/User');

const registerTask = async (data, io, socket) => {
  try {
    const user = await User.findOne({ username: data.createdBy });
    const assignedUser = await User.findOne({
      username: data.assignedUser,
    });
    if (!user || !assignedUser) {
      socket.emit('taskError', { message: 'User not found' });
      return;
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
    socket.emit('taskError', { message: err.message });
    console.log(err);
  }
};

const completeTask = async (data, username, io, socket) => {
  try {
    const taskId = data._id;
    const name = username.id;

    const task = await Task.findById(taskId);
    if (!task) {
      socket.emit('taskError', { message: 'Task not found' });
      return;
    }

    const user = await User.findOne({ username: name });
    if (!user) {
      socket.emit('taskError', { message: 'User not found' });
      return;
    }

    task.completedBy = user._id;
    task.isDone = true;
    await task.save();

    user.completedTasks.push(task._id);
    await user.save();
    broadCastCompleteTask(task, io);
  } catch (err) {
    socket.emit('taskError', { message: err.message });
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
