/** @format */

const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST'],
  },
});

const server = http.createServer(app);

server.listen(3001, () => {
  console.log('server is running');
});
