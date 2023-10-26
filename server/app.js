const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { default: mongoose } = require('mongoose');
const app = express();
const server = http.createServer(app);
require('dotenv').config();

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

module.exports = { app, server, io, mongoose };
