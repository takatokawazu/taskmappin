const {
  videoRooms,
  onlineUsers,
  socketToUserId,
  broadcastVideoRooms,
} = require('./userHandlers');

const videoRoomCreateHandler = (socket, data, io) => {
  console.log('new room', data);
  const { peerId, newRoomId, userId } = data;
  videoRooms[newRoomId] = {
    participants: [
      {
        userId: socketToUserId[socket.id],
        username: onlineUsers[socketToUserId[socket.id]].username,
        socketId: socket.id,
        peerId,
      },
    ],
  };
  const callData = {
    callerUserId: socketToUserId[socket.id],
    callerSocketId: socket.id,
    username: onlineUsers[socketToUserId[socket.id]].username,
    peerId,
    newRoomId,
  };
  broadcastVideoRooms(io, userId, callData);
};

const videoRoomJoinHandler = (socket, data, io) => {
  const { roomId, peerId, userId } = data;
  if (videoRooms[roomId]) {
    videoRooms[roomId].participants.forEach((participant) => {
      socket.to(participant.socketId).emit('video-room-init', {
        newParticipantPeerId: peerId,
      });
    });
    videoRooms[roomId].participants = [
      ...videoRooms[roomId].participants,
      {
        userId: socketToUserId[socket.id],
        username: onlineUsers[socketToUserId[socket.id]].username,
        socketId: socket.id,
        peerId,
      },
    ];

    const callData = {
      callerUserId: socketToUserId[socket.id],
      callerSocketId: socket.id,
      username: onlineUsers[socketToUserId[socket.id]].username,
      peerId,
      roomId,
    };

    broadcastVideoRooms(io, userId, callData);
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

  if (videoRooms[roomId]?.participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms(io, 'logged-users');
};

module.exports = {
  videoRoomCreateHandler,
  videoRoomJoinHandler,
  videoRoomLeaveHandler,
};
