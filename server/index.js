const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send('Hello server is started');
});

let onlineUsers = {};
let videoRooms = {};

io.on('connection', (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  socket.on('user-login', (data) => loginEventHandler(socket, data));

  socket.on('chat-message', (data) => chatMessageHandler(socket, data));

  socket.on('video-room-create', (data) =>
    videoRoomCreateHandler(socket, data)
  );

  socket.on('disconnect', () => {
    disconnectEventHandler(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const disconnectEventHandler = (id) => {
  console.log(`user disconnected of the id: ${id}`);
  removeOnlineUser(id);
  // removeUserFromVideoRooms(id);
  broadcastDisconnectedUserDetails(id);
};

const chatMessageHandler = (socket, data) => {
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

const videoRoomCreateHandler = (socket, data) => {
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

  broadcastVideoRooms();
};

// const removeUserFromVideoRooms = (id) => {
//   Object.keys(videoRooms).forEach((roomId) => {
//     const room = videoRooms[roomId];
//     const participantIndex = room.participants.findIndex(
//       (participant) => participant.socketId === id
//     );
//     if (participantIndex !== -1) {
//       room.participants.splice(participantIndex, 1);
//       if (room.participants.length === 0) {
//         // ルームの参加者が0人になった場合、ルームを削除する
//         delete videoRooms[roomId];
//       }
//     }
//   });
//   broadcastVideoRooms(); // 更新したビデオルームの情報をブロードキャストする
// };

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
};

const broadcastVideoRooms = () => {
  io.emit('video-rooms', videoRooms);
};

const loginEventHandler = (socket, data) => {
  socket.join('logged-users');

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to('logged-users').emit('online-users', convertOnlineUsersToArray());
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
