import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import socket from "../../services/socket";

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
        onChange={(e) => setRoomID(e.target.value)}
        className="bg-gray-700 rounded-lg py-4 px-6 text-white outline-none text-xl"
      />
      <button onClick={HandleSubmit} className="text-2xl">
        Create Room
      </button>
    </div>
  );
};

export default CreateRoom;
