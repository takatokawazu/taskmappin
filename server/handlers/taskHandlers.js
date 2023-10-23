const Task = require('../models/Task');

const taskHandler = async (socket, data, io) => {
  let tasks = await Task.find();
  console.log(data);
  tasks.push(data);
  io.emit('task-add', tasks);
};

module.exports = { taskHandler };
