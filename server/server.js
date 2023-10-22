const { app, server } = require('./app');
const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: 9000, path: '/peer' });

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello server is started');
});

app.get('/user', (req, res) => {
  res.send('hello users');
});
