const { app, server, io, mongoose } = require('./app');
const { PeerServer } = require('peer');
const express = require('express');

const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const setupSocketHandlers = require('./handlers/socketHandlers');

const peerServer = PeerServer({ port: 9000, path: '/peer' });
app.use(express.json());
const PORT = process.env.PORT || 3003;

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
