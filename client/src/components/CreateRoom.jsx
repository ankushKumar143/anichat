import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import socket from "../services/socket";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomID] = useState("");
  const HandleSubmit = () => {
    console.log("clicked");
    if (!username || !roomId) {
      return alert("Fill all fields");
    }
    const cleanRoomId = roomId.trim().toLowerCase();

    sessionStorage.setItem("username", username);
    // CREATE ROOM

    socket.emit("create-room", {
      roomId: cleanRoomId,

      username,
    });
  };
  useEffect(() => {
    socket.on("room-created", (roomId) => {
      navigate(`/room/${roomId}`, {
        state: {
          username,
        },
      });
    });

    socket.on("room-exists", () => {
      alert("Room already exists");
    });

    return () => {
      socket.off("room-created");

      socket.off("room-exists");
    };
  }, [username, navigate]);
  return (
    <div
      className="flex 
          flex-col 
          gap-8 
          md:gap-16
          bg-white/10 
          backdrop-blur-[1px] 
          border 
          border-white/20 
          shadow-lg 
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
          py-4 px-6 
          text-white 
          outline-none 
          text-xl
        "
      />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomID(e.target.value)}
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
      />
      <button
        onClick={HandleSubmit}
        className="text-2xl md:text-4xl font-semibold"
        style={{ textShadow: "2px 2px 10px black" }}
      >
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
