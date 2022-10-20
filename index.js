const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3001;
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => null);
  socket.on("join-room", (data) => {
    socket.join(data.id);
  });
  socket.on("setup", (room) => {
    socket.join(room);
    socket.emit("connected");
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));
  socket.on("send-message", (data) => {
    socket.to(data.room).emit("rec", data);
  });
});

server.listen(port, () => console.log(`http://localhost:${port}`));
