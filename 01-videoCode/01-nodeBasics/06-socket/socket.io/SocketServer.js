const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('hello')
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('receive', (data) => {
    socket.broadcast.emit('message', data)
  })
});


server.listen(3001, () => {
  console.log('listening on *:3001');
});