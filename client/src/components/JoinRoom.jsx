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
    <div
      className="flex 
          flex-col 
          bg-white/10 
          backdrop-blur-[1px] 
          border 
          border-white/20 
          shadow-lg 
          gap-8 
          md:gap-16
          rounded-xl 
          text-3xl 
          m-5 
          px-16 
          py-10
          md:px-32 
          md:py-20
          w-75
          md:w-140
        "
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="backdrop-blur-[3px] 
          border 
          placeholder:text-gray-300 
          border-white/20 
          shadow-lg 
          rounded-lg 
          py-4 
          px-6 
          text-white 
          outline-none 
          text-xl
        "
        style={{ textShadow: "2px 2px 10px black" }}
      />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="backdrop-blur-[3px] 
          border 
          placeholder:text-gray-300 
          border-white/20 
          shadow-lg 
          rounded-lg 
          py-4 
          px-6 
          text-white 
          outline-none 
          text-xl
        "
        style={{ textShadow: "2px 2px 10px black" }}
      />
      <button
        onClick={HandleSubmit}
        className="text-2xl md:text-4xl font-semibold"
        style={{ textShadow: "2px 2px 10px black" }}
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;
