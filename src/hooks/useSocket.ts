import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { baseURL } from "../state/api";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    //@ts-ignore
    const newSocket = io(baseURL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
