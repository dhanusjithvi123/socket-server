// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package
const { log } = require('console');

// Create an Express application
const app = express();

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Create a Socket.IO server by passing the HTTP server
const io = socketIo(server);

// Configure CORS to allow requests from http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
  credentials: true, // Enable sending cookies and HTTP credentials
}));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected'); // Log when a user connects

  // Listen for 'drawing' events from clients
  socket.on('drawing', (data) => {
    // Broadcast drawing data to all connected clients
    console.log(data); // Log the received drawing data
    socket.broadcast.emit('drawing', data);
  });

  // Listen for 'disconnect' events (when a user disconnects)
  socket.on('disconnect', () => {
    console.log('A user disconnected'); // Log when a user disconnects
  });
});

// Set the server to listen on a port (3000 by default)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log when the server starts
});
