const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3001;
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  socket.on("join-room", (data) => {
    //console.log("join-room")
    socket.join(data.id);
  });

  socket.on("send-message", (data) => {
    //console.log("send-message")
    socket.to(data.room).emit("rec", data);
  });
});

server.listen(port, () => console.log(`http://localhost:${port}`));
