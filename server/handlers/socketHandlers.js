const Task = require('../models/Task');
const userHandlers = require('./userHandlers');
const videoRoomHandlers = require('./videoRoomHandlers');
const taskHandlers = require('./taskHandlers');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`user connected of the id: ${socket.id}`);

    socket.on('user-login', (data) =>
      userHandlers.loginEventHandler(socket, data, io)
    );

    Task.find().then((messages) => {
      socket.emit('init', messages);
    });

    socket.on('add-task', (task) => {
      taskHandlers.registerTask(task, io);
    });

    socket.on('complete-task', (task, username) => {
      taskHandlers.completeTask(task, username, io);
    });

    socket.on('chat-message', (data) =>
      userHandlers.chatMessageHandler(socket, data, io)
    );

    socket.on('video-room-create', (data) =>
      videoRoomHandlers.videoRoomCreateHandler(socket, data, io)
    );

    socket.on('video-room-join', (data) =>
      videoRoomHandlers.videoRoomJoinHandler(socket, data, io)
    );

    socket.on('video-room-leave', (data) =>
      videoRoomHandlers.videoRoomLeaveHandler(socket, data, io)
    );

    socket.on('disconnect', () =>
      userHandlers.disconnectEventHandler(socket, io)
    );
  });
};

module.exports = setupSocketHandlers;
