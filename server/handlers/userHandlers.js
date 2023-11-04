let onlineUsers = {};
let videoRooms = {};
let socketToUserId = {};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId, io) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
};

const broadcastVideoRooms = (io) => {
  io.to('logged-users').emit('video-rooms', videoRooms);
};

const loginEventHandler = (socket, data, io) => {
  socket.join('logged-users');
  const user = data.user;
  console.log(`user connected of the id: ${user._id}`);
  onlineUsers[user._id] = {
    username: user.username,
    coords: data.coords,
    socketId: socket.id,
  };

  socketToUserId[socket.id] = user._id;

  io.to('logged-users').emit(
    'online-users',
    socketToUserId,
    convertOnlineUsersToArray()
  );

  broadcastVideoRooms(io);
};

const chatMessageHandler = (socket, data, io) => {
  const { receiverUserId, content, id } = data;
  console.log('message received');
  console.log('sending message to other user');
  console.log(receiverUserId);
  // console.log(socketToUserId);
  // console.log(onlineUsers);
  console.log(socketToUserId[socket.id]);
  console.log(onlineUsers[receiverUserId]);
  console.log('#########################');
  if (onlineUsers[receiverUserId]) {
    console.log('通った');
    io.to(onlineUsers[receiverUserId].socketId).emit('chat-message', {
      senderUserId: socketToUserId[socket.id],
      content,
      id,
    });
  }
};

const disconnectEventHandler = (socket, io) => {
  console.log(`user disconnected of the id: ${socket.id}`);
  const userId = socketToUserId[socket.id];

  if (userId !== undefined) {
    console.log(`socketId ${socket.id} に対応するuser._idは ${userId} です。`);
    checkIfUserIsInCall(socket, io);
    removeOnlineUser(userId);
    delete socketToUserId[socket.id];
    broadcastDisconnectedUserDetails(userId, io);
  } else {
    console.log(
      `socketId ${socket.id} に対応するユーザーが見つかりませんでした。`
    );
  }
  // checkIfUserIsInCall(socket, io);
  // removeOnlineUser(foundUserId);
  // broadcastDisconnectedUserDetails(foundUserId, io);
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
};

const checkIfUserIsInCall = (socket, io) => {
  Object.entries(videoRooms).forEach(([key, value]) => {
    console.log('check!!!!!!!!!!!!!!!!');
    console.log(value);
    const participant = value.participants.find(
      (p) => p.userId === socketToUserId[socket.id]
    );

    if (participant) {
      removeUserFromTheVideoRoom(socketToUserId[socket.id], key, io);
    }
  });
};

const removeUserFromTheVideoRoom = (userId, roomId, io) => {
  videoRooms[roomId].participants = videoRooms[roomId].participants.filter(
    (p) => p.userId !== userId
  );

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  } else {
    io.to(videoRooms[roomId].participants[0].userId).emit(
      'video-call-disconnect'
    );
  }

  broadcastVideoRooms(io);
};

const convertOnlineUsersToArray = () => {
  const onlineUsersArray = [];

  Object.entries(onlineUsers).forEach(([key, value]) => {
    const newEntry = {
      userId: key,
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
  socketToUserId,
  broadcastVideoRooms,
};
