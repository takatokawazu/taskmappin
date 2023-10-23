const userHandlers = require('./userHandlers');
const videoRoomHandlers = require('./videoRoomHandlers');

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`user connected of the id: ${socket.id}`);

    socket.on('user-login', (data) =>
      userHandlers.loginEventHandler(socket, data, io)
    );

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
