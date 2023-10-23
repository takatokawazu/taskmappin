let onlineUsers = {};
let videoRooms = {};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId, io) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
};

const broadcastVideoRooms = (io) => {
  io.to('logged-users').emit('video-rooms', videoRooms);
};

const loginEventHandler = (socket, data, io) => {
  socket.join('logged-users');
  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to('logged-users').emit('online-users', convertOnlineUsersToArray());
  broadcastVideoRooms(io);
};

const chatMessageHandler = (socket, data, io) => {
  const { receiverSocketId, content, id } = data;
  if (onlineUsers[receiverSocketId]) {
    console.log('message received');
    console.log('sending message to other user');
    io.to(receiverSocketId).emit('chat-message', {
      senderSocketId: socket.id,
      content,
      id,
    });
  }
};

const disconnectEventHandler = (socket, io) => {
  console.log(`user disconnected of the id: ${socket.id}`);
  checkIfUserIsInCall(socket, io);
  removeOnlineUser(socket.id);
  broadcastDisconnectedUserDetails(socket.id, io);
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
};

const checkIfUserIsInCall = (socket, io) => {
  Object.entries(videoRooms).forEach(([key, value]) => {
    const participant = value.participants.find(
      (p) => p.socketId === socket.id
    );

    if (participant) {
      removeUserFromTheVideoRoom(socket.id, key, io);
    }
  });
};

const removeUserFromTheVideoRoom = (socketId, roomId, io) => {
  videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
    (p) => p.socketId !== socketId
  );

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  } else {
    io.to(videoRooms[roomId].participants[0].socketId).emit(
      'video-call-disconnect'
    );
  }

  broadcastVideoRooms(io);
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    const newEntry = {
      socketId: key,
      username: value.username,
      coords: value.coords,
    };

    const existingEntryIndex = onlineUsersArray.findIndex(
      (entry) => entry.username === newEntry.username
    );

    if (existingEntryIndex !== -1) {
      onlineUsersArray.splice(existingEntryIndex, 1);
    }

    onlineUsersArray.push(newEntry);
  });

  return onlineUsersArray;
};

module.exports = {
  loginEventHandler,
  chatMessageHandler,
  disconnectEventHandler,
  onlineUsers,
  videoRooms,
  broadcastVideoRooms,
};
