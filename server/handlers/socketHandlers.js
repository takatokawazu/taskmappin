const Task = require('../models/Task');
const userHandlers = require('./userHandlers');
const taskHandlers = require('./taskHandlers');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    socket.on('user-login', (data) =>
      userHandlers.loginEventHandler(socket, data, io)
    );

    Task.find().then((messages) => {
      socket.emit('get-task', messages);
    });

    socket.on('add-task', (task) => {
      taskHandlers.registerTask(task, io, socket);
    });

    socket.on('complete-task', (task, userId) => {
      taskHandlers.completeTask(task, userId, io, socket);
    });

    socket.on('chat-message', (data) =>
      userHandlers.chatMessageHandler(socket, data, io)
    );

    socket.on('disconnect', () =>
      userHandlers.disconnectEventHandler(socket, io)
    );
  });
};

module.exports = setupSocketHandlers;
