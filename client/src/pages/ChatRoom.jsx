import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import socket from "../services/socket";

const ChatRoom = () => {
  const bottomRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();
  const username = sessionStorage.getItem("username");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // JOIN ROOM
    socket.emit("join-room", {
      roomId,
      username,
    });
    const handleMessage = (data) => {
      console.log("RECEIVED:", data);

      setMessages((prev) => [...prev, data]);
    };

    socket.on("receive-message", handleMessage);

    // JOIN NOTICE
    socket.on("user-joined", (username) => {
      setMessages((prev) => [
        ...prev,
        {
          system: true,
          message: `${username} joined the chatroom.`,
        },
      ]);
      // setTimeout(() => {
      //   setJoinNotice("");
      // }, 3000);
    });

    //left notice
    socket.on("user-left", (username) => {
      setMessages((prev) => [
        ...prev,
        {
          system: true,
          message: `${username} left the chatroom.`,
        },
      ]);
      // setTimeout(() => {
      //   setJoinNotice("");
      // }, 3000);
    });

    return () => {
      socket.off("receive-message", handleMessage);
      socket.off("user-joined");
      socket.off("user-left");
    };
  }, []);

  //Send msg
  const sendMsg = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      roomId,
      message,
      username,
    });

    setMessage("");
  };

  //auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" }, [messages]);
  });
  return (
    <div className="bg-gray-600 h-dvh overflow-hidden">
      <div className="bg-gray-800  fixed top-0 left-0 w-full h-12">
        <h1 className="text-2xl px-5 py-2 font-bold text-white">AniChat</h1>
      </div>
      <div className="flex flex-col pt-16 pb-20 overflow-y-auto scroll-auto hide-scrollbar h-full">
        {messages.map((msg, index) => {
          //System Msg
          if (msg.system) {
            return (
              <div className="flex justify-center text-white text-xs">
                {msg.message}
              </div>
            );
          }

          //Normal Chat Msg
          const showUsername =
            msg.username !== username &&
            (index === 0 || messages[index - 1].username !== msg.username);
          return (
            <div
              key={index}
              className={`${
                msg.username === username
                  ? "bg-white text-gray-800 self-end"
                  : "bg-gray-900 text-white self-start"
              }
                px-5
                py-3
                m-2
                rounded-2xl
                max-w-[75%]
                wrap-break-words
                w-fit`}
            >
              <div className="flex flex-col">
                {showUsername && (
                  <span
                    className="
                      text-[10px]
                      font-bold
                      text-gray-400
                      mb-1
                      opacity-70
                  "
                  >
                    {msg.username}
                  </span>
                )}

                <span>{msg.message}</span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>
      <div className="fixed bottom-0 left-0 w-full flex justify-between bg-gray-800 h-15">
        <input
          className="w-[85%] px-5 rounded-xl h-12 my-auto mx-2 outline-none bg-gray-400"
          type="text"
          placeholder="Send Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMsg}
          className="w-[15%] flex items-center justify-center h-12 m-auto"
        >
          <Send className="text-white" size={30} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
