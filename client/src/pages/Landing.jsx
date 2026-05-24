import React, { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

const Landing = () => {
  const [mode, setMode] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full text-white bg-gray-600">
      <h1
        className="text-5xl mb-5 font-bold"
        style={{ textShadow: "2px 2px 10px black" }}
      >
        AniChat
      </h1>
      {mode === null && (
        <div className="flex flex-col gap-8 rounded-xl text-3xl m-5 px-16 py-10 bg-gray-800">
          <button
            style={{ textShadow: "2px 2px 10px black" }}
            onClick={() => setMode("create")}
          >
            Create Room
          </button>
          <button
            style={{ textShadow: "2px 2px 10px black" }}
            onClick={() => setMode("join")}
          >
            Join Room
          </button>
        </div>
      )}
      {mode === "create" && <CreateRoom />}
      {mode === "join" && <JoinRoom />}
    </div>
  );
};

export default Landing;
