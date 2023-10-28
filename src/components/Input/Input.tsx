import { Ionicons } from "@expo/vector-icons";
import {
  Input as IInput,
  IInputProps,
  ITextAreaProps,
  Icon,
  TextArea,
  useTheme,
} from "native-base";
import React from "react";
import { TextMuted } from "../Text/Text";

interface InputProps extends IInputProps {
  hasError?: boolean;
  icon?: any;
  label?: string;
  multiline?: boolean;
  onAction?: () => void;
}

const Input: React.FC<InputProps & ITextAreaProps> = ({
  multiline = false,
  hasError = false,
  icon,
  label,
  onAction,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <>
      {label && <TextMuted mb={1}>{label}</TextMuted>}
      {multiline ? (
        <TextArea
          autoCompleteType=""
          borderWidth={0.4}
          backgroundColor="transparent"
          borderColor="border.muted"
          textAlign="right"
          _input={{ selectionColor: theme.colors.text.main }}
          color="text.main"
          fontSize="md"
          placeholderTextColor="text.muted"
          borderRadius={5}
          _focus={{
            borderColor: "border.sharp",
            borderWidth: 1,
          }}
          leftElement={
            <Icon
              as={Ionicons}
              onPress={onAction}
              style={{
                marginLeft: 10,
              }}
              color="text.main"
              name={icon}
              size="sm"
            />
          }
          {...rest}
        />
      ) : (
        <IInput
          borderWidth={0.4}
          backgroundColor="transparent"
          borderColor="border.muted"
          textAlign="right"
          _input={{ selectionColor: theme.colors.text.muted }}
          color="text.main"
          fontSize="md"
          placeholderTextColor="text.muted"
          height="10"
          pr={2}
          borderRadius={5}
          _focus={{
            borderColor: "border.sharp",
            borderWidth: 1,
          }}
          leftElement={
            <Icon
              as={Ionicons}
              onPress={onAction}
              style={{
                marginLeft: 10,
              }}
              color="text.main"
              name={icon}
              size="md"
            />
          }
          {...rest}
        />
      )}
    </>
  );
};
export default Input;
