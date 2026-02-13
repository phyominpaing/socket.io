import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

type Message = {
  message: string;
  userName: string;
};

io.on("connection", (socket) => {
  console.log("A user is connected.", socket.id);

  io.emit("Join Noti", { message: "A new user is joined." });

  socket.on("send message", ({ message, userName }: Message) => {
    io.emit("send message", { message, userName });
  });

  socket.on("disconnect", () => {
    console.log("A user is disconnected.");
    io.emit("Leave Noti", { message: "A new user is left." });
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening on PORT :3000");
});
