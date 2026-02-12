import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("A user is connected.", socket.id);
});

httpServer.listen(3000, () => {
  console.log("Server is listening on PORT :3000");
});
