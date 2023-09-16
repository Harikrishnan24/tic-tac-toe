import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "http://localhost:3001",
  },
});
io.on("connection", (socket) => {
  let roomId = "";
  socket.on("updatedCurrentPlayerData", (...args) => {
    if (roomId) {
      socket.to(roomId).emit("currentPlayerData", ...args);
    }
  });
  socket.on("joinRoom", (val) => {
    const { id } = val;
    socket.join(id);
    roomId = id;
  });
});
