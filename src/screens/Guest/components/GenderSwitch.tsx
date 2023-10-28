import { Switch } from "@components";
import React from "react";
import { SwitchProps } from "src/components/Switch/Switch";

const GenderSwitch: React.FC<Omit<SwitchProps, "data">> = ({ value, onChange }) => {
  return (
    <Switch
      value={value}
      onChange={onChange}
      data={[
        { name: "female", label: "خانم هستم", icon: "user-female" },
        { name: "male", label: "آقا هستم", icon: "user" },
      ]}
    />
  );
};

export default GenderSwitch;
