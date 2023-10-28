import React from "react";
import ListAnimation from "../ListAnimation/ListAnimation";
import { useGender } from "../../hooks";
import animations from "../../assets/animations";

interface Props {
  onRefresh?: () => void;
}
const NetError: React.FC<Props> = ({ onRefresh }) => {
  const { isMale } = useGender();
  return (
    <ListAnimation
      onRefresh={onRefresh}
      full
      title="خطا در دریافت اطلاعات"
      name={isMale ? animations.male.netError : animations.female.netError}
    />
  );
};

export default NetError;
