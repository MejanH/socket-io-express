import express from "express";
import http, { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send(`<h1>Hello world</h1>`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("hello", (msg) => {
    console.log("message: " + msg);
    io.emit("hello", "world");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// on windows WSL, host needs to be 0.0.0.0.
server.listen({ port: 8000, host: "0.0.0.0" }, () => {
  console.log("http://localhost:8000");
});
