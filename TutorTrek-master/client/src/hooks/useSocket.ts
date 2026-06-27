import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import CONFIG_KEYS from "../config";

export const useSocket = (courseId?: string) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const tokenObj = localStorage.getItem("accessToken");
    let token = "";
    if (tokenObj) {
      try {
        token = JSON.parse(tokenObj)?.accessToken || "";
      } catch (e) {
        token = "";
      }
    }

    if (!token) return;

    const socketUrl = CONFIG_KEYS.API_BASE_URL.replace(/\/api$/, "") || window.location.origin;

    const socket = io(socketUrl, {
      query: { token },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      if (courseId) {
        socket.emit("join_room", courseId);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [courseId]);

  return socketRef.current;
};

export default useSocket;
