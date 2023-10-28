import { AppointmentRouteProp } from "@navigation/types";
import { useRoute } from "@react-navigation/core";
import { baseURL } from "@state/api";
import { createContext, useContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import Appointment from "./Appointment";

export const socketContext = createContext<Socket>({} as Socket);

const AppointmentProvider = () => {
  const { params } = useRoute<AppointmentRouteProp>();
  const { appointmentId } = params;

  const socket = io(baseURL);

  useEffect(() => {
    console.log("ApptProvider runned");
    socket.emit("join-room", { room: appointmentId });
    return () => {
      socket.emit("leave-room", { room: appointmentId });
      socket.disconnect();
    };
  }, [socket]);

  return (
    <socketContext.Provider value={socket}>
      <Appointment id={appointmentId} />
    </socketContext.Provider>
  );
};

export const useApptSocket = () => {
  const socket = useContext(socketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export default AppointmentProvider;
