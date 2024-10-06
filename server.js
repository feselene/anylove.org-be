const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the homepage
app.get('/', (req, res) => {
  res.send('Welcome to the anylove.org real-time chat server');
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast the message to everyone else
    io.emit('chat message', msg);
  });

  // Handle user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
