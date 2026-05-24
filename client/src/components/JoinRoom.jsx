import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const HandleSubmit = () => {
    if (!username || !roomId) {
      return alert("Fill all fields");
    }
    const cleanRoomId = roomId.trim().toLowerCase();
    sessionStorage.setItem("username", username);
    socket.emit("check-room", {
      roomId: cleanRoomId,

      username,
    });
  };
  useEffect(() => {
    socket.on("room-valid", (roomId) => {
      navigate(`/room/${roomId}`, { state: { username } });
    });
    socket.on("room-not-found", () => {
      alert("Room not found");
    });
    return () => {
      socket.off("room-joined");
      socket.off("room-not-found");
    };
  }, [socket, navigate]);
  return (
    <div className="flex flex-col gap-8 rounded-xl text-3xl m-5 px-16 py-10 bg-gray-800 w-75">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-gray-700 rounded-lg py-4 px-6 text-white outline-none text-xl"
      />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="bg-gray-700 rounded-lg py-4 px-6 text-white outline-none text-xl"
      />
      <button onClick={HandleSubmit} className="text-2xl">
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
