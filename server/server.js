const { app, server, io, mongoose } = require('./app');
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const setupSocketHandlers = require('./handlers/socketHandlers');
const { ExpressPeerServer } = require('peer');
const PORT = process.env.PORT || 3003;
console.log(PORT);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use(express.json());
app.use('/peerjs', peerServer);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname1, 'client', 'build', 'index.html'));
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
