import React from "react";
import animations from "../../assets/animations";
import ListAnimation from "../ListAnimation/ListAnimation";

const Loading = () => {
  return <ListAnimation name={animations.male.loading} />;
};

export default Loading;
