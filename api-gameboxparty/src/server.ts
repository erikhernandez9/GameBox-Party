import "dotenv/config";
import app from "./app";
import http from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { getRoomByRoomId } from "./models/rooms";

const PORT = Number(process.env.API_PORT);
const HOST = process.env.API_HOST;

export const server = http.createServer(app);
export const io = new SocketServer(server, {
  cors: {
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);
  
  socket.emit("message", "Welcome to Socket!");
  socket.on("join-room", async (room) => {
    socket.join(room);
    let newRoom = await getRoomByRoomId(room);
    io.to(room).emit("newParticipant", newRoom);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`);
});
