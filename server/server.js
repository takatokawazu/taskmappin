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
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3003;

// ~~~~~~~~~~~~~~~deploy~~~~~~~~~~~~~~
// const peerServer = PeerServer({ path: '/peerjs' });
// const peerServer = PeerServer({ port: '9000', path: '/peerjs' });
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use(cookieParser());
app.use(express.json());
app.use('/peerjs', peerServer);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

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

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is Running Successfully');
  });
}
