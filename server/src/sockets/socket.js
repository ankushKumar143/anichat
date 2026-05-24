const activeRooms = new Set();
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // CREATE ROOM
    socket.on("create-room", ({ roomId, username }) => {
      // CHECK ROOM
      if (activeRooms.has(roomId)) {
        socket.emit("room-exists");
        return;
      }

      // ADD ROOM
      activeRooms.add(roomId);

      socket.join(roomId);

      socket.emit("room-created", roomId);

      console.log(activeRooms);
    });

    // JOIN ROOM
    socket.on("join-room", ({ roomId, username }) => {
      socket.join(roomId);

      socket.username = username;
      socket.roomId = roomId;

      socket.to(roomId).emit("user-joined", username);
    });

    socket.on("check-room", ({ roomId, username }) => {
      // CHECK ROOM

      if (!activeRooms.has(roomId)) {
        socket.emit("room-not-found");

        return;
      }

      socket.emit("room-valid", roomId);
    });

    // SEND MESSAGE
    socket.on("send-message", (data) => {
      console.log("MESSAGE:", data);

      // SEND TO EVERYONE
      // INCLUDING SENDER

      io.in(data.roomId).emit("receive-message", {
        username: data.username,

        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");

      if (socket.roomId && socket.username) {
        socket.to(socket.roomId).emit("user-left", socket.username);
      }
    });
  });
};

module.exports = socketHandler;
