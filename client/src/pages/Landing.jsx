import React, { useState } from "react";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";
import bgimg1 from "../assets/columbina.jpg";
import bgimg2 from "../assets/bina.jpeg";

const Landing = () => {
  const [mode, setMode] = useState(null);

  return (
    <div className="relative h-screen">
      {/*desktop background image */}
      <div
        className="
          hidden
          md:block
          absolute 
          inset-0 
          bg-cover 
          bg-center 
          brightness-75 
          contrast-110 
          saturate-110
        "
        style={{ backgroundImage: `url(${bgimg2})` }}
      ></div>

      {/*mobile background image */}
      <div
        className="
          block
          md:hidden
          absolute 
          inset-0 
          bg-cover 
          bg-center 
          brightness-75 
          contrast-110 
          saturate-110
        "
        style={{ backgroundImage: `url(${bgimg1})` }}
      ></div>

      {/* content */}
      <div
        className="relative 
            z-10 
            flex 
            flex-col 
            items-center 
            justify-center 
            h-screen 
            w-full 
            text-white
          "
      >
        <h1
          className="text-5xl 
            absolute 
            top-0 
            left-0 
            md:static
            md:text-7xl
            m-2 
            md:m-7
            font-bold
          "
          style={{ textShadow: "2px 2px 10px black" }}
        >
          AniChat
        </h1>
        {mode === null && (
          <div
            className="flex 
                flex-col 
                gap-8 
                md:gap-16
                bg-white/10 
                rounded-md 
                backdrop-blur-[1px] 
                border 
                border-white/20 
                shadow-lg 
                text-3xl 
                md:text-5xl
                m-5 
                px-16 
                py-10 
                md:px-32 
                md:py-20
              "
          >
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
    </div>
  );
};

export default Landing;
