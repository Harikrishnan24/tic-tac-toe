import { Server } from "socket.io";
import { FRONTEND_URL } from "./urlConfig";
const io = new Server(3000, {
  cors: {
    origin: `https://tic-tac-toe-rose-kappa.vercel.app:3001`,
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
