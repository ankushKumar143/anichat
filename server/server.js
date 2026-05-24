require("dotenv").config();
const http = require("http");

const { Server } = require("socket.io");
const app = require("./src/app.js");
const socketHandler = require("./src/sockets/socket.js");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const PORT = process.env.PORT || 3000;

socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
