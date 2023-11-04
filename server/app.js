const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { default: mongoose } = require('mongoose');
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
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

module.exports = { app, server, io, mongoose };
