import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import ChatRoom from "../pages/ChatRoom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/room/:roomId" element={<ChatRoom />} />
    </Routes>
  );
};

export default AppRoutes;
