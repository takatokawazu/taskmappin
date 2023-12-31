const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const setupSocketHandlers = require('./handlers/socketHandlers');
const mongoose = require('mongoose');
const { ExpressPeerServer, PeerServer } = require('peer');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3003;

// ~~~~~~~~~~~~~~~deploy~~~~~~~~~~~~~~
// const peerServer = PeerServer({ path: '/peerjs' });
// const peerServer = PeerServer({ port: '9000' });
// const peerServer = ExpressPeerServer(server, {
//   debug: true,
// });

const peerServer = PeerServer({
  port: '9000',
  path: '/myapp',
  proxied: true,
});

app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/peerjs', peerServer);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected!');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      setupSocketHandlers(io);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname1, '/client/build')));
//   app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is Running Successfully');
//   });
// }
