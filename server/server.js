const { app, server, io, mongoose } = require('./app');
const { PeerServer } = require('peer');
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const setupSocketHandlers = require('./handlers/socketHandlers');

app.use(express.json());

const PORT = process.env.PORT || 3003;
const peerServer = PeerServer({ port: process.env.PORT, path: '/peerjs' });

const __dirname1 = path.resolve();
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

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
