import { useMemo } from "react";
import useAuth from "./useAuth";

const usePhoto = () => {
  const { user } = useAuth();

  const BarberHeader = useMemo(() => {
    return user
      ? user.gender === "male"
        ? require("../../assets/photos/male/Header.jpg")
        : require("../../assets/photos/female/Header.jpg")
      : require("../../assets/photos/default/Barber.jpg");
  }, [user]);

  const AvatarPlaceholder = useMemo(() => {
    return user
      ? user.gender === "male"
        ? require("../../assets/photos/male/avatar.png")
        : require("../../assets/photos/female/avatar.png")
      : require("../../assets/photos/default/Barber.jpg");
  }, [user]);

  const BarberLogo = useMemo(() => {
    return user
      ? user.gender === "male"
        ? require("../../assets/photos/male/Logo.jpg")
        : require("../../assets/photos/female/Logo.jpg")
      : require("../../assets/photos/default/Barber.jpg");
  }, [user]);

  const SearchLogo = require("../../assets/photos/Search.png");
  const Base = require("../../assets/photos/male/Header.jpg");
  const Placeholder = require("../../assets/photos/placeholder.jpg");
  const Map = require("../../assets/photos/Map.jpg");

  return { BarberLogo, BarberHeader, SearchLogo, Base, Placeholder, AvatarPlaceholder, Map };
};

export default usePhoto;
