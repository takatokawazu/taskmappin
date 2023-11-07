const { app, server, io, mongoose } = require('./app');
const { PeerServer } = require('peer');
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const setupSocketHandlers = require('./handlers/socketHandlers');

app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../front/build'));
//   app.get('*', function (req, res) {
//     const indexHtml = path.resolve('../front/build', 'index.html');
//     res.sendFile(indexHtml);
//   });
// } else {
app.get('/', (req, res) => {
  res.send('API is Running Successfully');
});
// }

const peerServer = PeerServer({ port: 9000, path: '/peer' });
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
