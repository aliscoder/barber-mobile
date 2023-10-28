import { ISwitchProps, Switch } from "native-base";
import React from "react";

interface Props extends ISwitchProps {}

const Toggle = ({ ...rest }: Props) => {
  return (
    <Switch
      onTrackColor="green.600"
      offTrackColor="gray.200"
      onThumbColor="enabled"
      offThumbColor="disabled"
      {...rest}
    />
  );
};

export default Toggle;
