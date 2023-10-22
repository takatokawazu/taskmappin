const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const setupSocketHandlers = require('./handlers/socketHandlers');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

setupSocketHandlers(io);

module.exports = { app, server };
