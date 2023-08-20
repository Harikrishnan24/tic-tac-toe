import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:3001",
  },
});
io.on("connection", (socket) => {
  socket.on("updatedCurrentPlayerData", (...args) => {
    socket.broadcast.emit("currentPlayerData", ...args);
  });
});
