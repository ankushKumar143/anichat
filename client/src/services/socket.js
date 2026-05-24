import { io } from "socket.io-client";

const socket = io("http://10.39.80.125:3000");

export default socket;
