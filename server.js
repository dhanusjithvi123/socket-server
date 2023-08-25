const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configure CORS to allow requests from http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));



io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('drawing', (data) => {
    // Broadcast drawing data to all connected clients
    console.log(data);
    socket.broadcast.emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
