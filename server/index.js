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

io.on('connection', (socket) => {
  console.log(`user connected of the id: ${socket.id}`);
  socket.on('disconnect', () => {
    disconnectEventHandler(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const disconnectEventHandler = (id) => {
  console.log(`user disconnected of the id: ${id}`);
};
