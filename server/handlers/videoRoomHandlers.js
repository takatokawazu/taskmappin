const {
  videoRooms,
  onlineUsers,
  broadcastVideoRooms,
} = require('./userHandlers');

const videoRoomCreateHandler = (socket, data, io) => {
  console.log('new room', data);
  const { peerId, newRoomId } = data;

  videoRooms[newRoomId] = {
    participants: [
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ],
  };

  broadcastVideoRooms(io);
};

const videoRoomJoinHandler = (socket, data, io) => {
  const { roomId, peerId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit('video-room-init', {
        newParticipantPeerId: peerId,
      });
    });

    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        socketId: socket.id,
        username: onlineUsers[socket.id].username,
        peerId,
      },
    ];

    broadcastVideoRooms(io);
  }
};

const videoRoomLeaveHandler = (socket, data, io) => {
  const { roomId } = data;

  if (videoRooms[roomId]) {
    videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
      (p) => p.socketId !== socket.id
    );
  }

  if (videoRooms[roomId]?.participants.length > 0) {
    socket
      .to(videoRooms[roomId].participants[0].socketId)
      .emit('video-call-disconnect');
  }
  console.log(videoRooms[roomId]);

  if (videoRooms[roomId]?.participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms(io);
};

module.exports = {
  videoRoomCreateHandler,
  videoRoomJoinHandler,
  videoRoomLeaveHandler,
};
