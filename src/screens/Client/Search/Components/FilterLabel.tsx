import { RowBetween, TextTiny } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useGender } from "@hooks";
import { IPressableProps, Icon, Pressable } from "native-base";
import React, { memo } from "react";

interface Props extends IPressableProps {
  title: string;
  icon: string;
  onFilter: () => void;
  selected: boolean;
  first?: boolean;
  width?: number;
}
const FilterLabel: React.FC<Props> = ({
  title,
  icon,
  selected,
  width = "32",
  onFilter,
  first,
  ...rest
}) => {
  const { isMale } = useGender();
  return (
    <Pressable onPress={onFilter} w={width} ml={first ? 0 : 3} {...rest}>
      <RowBetween
        background={selected ? "secondary" : "transparent"}
        borderColor="secondary"
        borderWidth={1}
        borderRadius={5}
        p={2}
      >
        <Icon
          as={Ionicons}
          size="sm"
          color={selected ? "text.light" : "text.secondary"}
          name={icon}
        />
        <TextTiny color={selected ? "text.light" : "text.secondary"} fontFamily="YekanBold">
          {title}
        </TextTiny>
      </RowBetween>
    </Pressable>
  );
};

export default memo(FilterLabel);
