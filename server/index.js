const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { PeerServer } = require('peer');

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const peerServer = PeerServer({ port: 9000, path: '/peer' });

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

  socket.on('video-room-join', (data) => {
    videoRoomJoinHandler(socket, data);
  });

  socket.on('video-room-leave', (data) => {
    videoRoomLeaveHandler(socket, data);
  });

  socket.on('disconnect', () => {
    disconnectEventHandler(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const disconnectEventHandler = (socket) => {
  console.log(`user disconnected of the id: ${socket.id}`);
  checkIfUserIsInCall(socket);
  removeOnlineUser(socket.id);
  broadcastDisconnectedUserDetails(socket.id);
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

const removeOnlineUser = (id) => {
  if (onlineUsers[id]) {
    delete onlineUsers[id];
  }
};

const checkIfUserIsInCall = (socket) => {
  Object.entries(videoRooms).forEach(([key, value]) => {
    const participant = value.participants.find(
      (p) => p.socketId === socket.id
    );

    if (participant) {
      removeUserFromTheVideoRoom(socket.id, key);
    }
  });
};

const removeUserFromTheVideoRoom = (socketId, roomId) => {
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

  broadcastVideoRooms();
};

const broadcastDisconnectedUserDetails = (disconnectedUserSocketId) => {
  io.to('logged-users').emit('user-disconnected', disconnectedUserSocketId);
};

const broadcastVideoRooms = () => {
  io.to('logged-users').emit('video-rooms', videoRooms);
};

const loginEventHandler = (socket, data) => {
  socket.join('logged-users');

  onlineUsers[socket.id] = {
    username: data.username,
    coords: data.coords,
  };

  io.to('logged-users').emit('online-users', convertOnlineUsersToArray());
  broadcastVideoRooms();
};

const videoRoomJoinHandler = (socket, data) => {
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

    broadcastVideoRooms();
  }
};

const videoRoomLeaveHandler = (socket, data) => {
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

  if (videoRooms[roomId].participants.length < 1) {
    delete videoRooms[roomId];
  }

  broadcastVideoRooms();
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
