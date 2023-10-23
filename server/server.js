const { app, server } = require('./app');
const { PeerServer } = require('peer');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

const peerServer = PeerServer({ port: 9000, path: '/peer' });

app.use(express.json());
const PORT = process.env.PORT || 3003;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected!');
  })
  .catch((error) => console.log(error));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
