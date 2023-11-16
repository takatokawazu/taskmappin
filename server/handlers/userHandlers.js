let onlineUsers = {};
let socketToUserId = {};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId, io) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
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
};

const chatMessageHandler = (socket, data, io) => {
  const { receiverUserId, content, id } = data;
  console.log('sending message to other user');
  if (onlineUsers[receiverUserId]) {
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
    removeOnlineUser(userId);
    broadcastDisconnectedUserDetails(userId, io);
    delete socketToUserId[socket.id];
  } else {
    console.log(
      `socketId ${socket.id} に対応するユーザーが見つかりませんでした。`
    );
  }
};

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
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
  socketToUserId,
};
