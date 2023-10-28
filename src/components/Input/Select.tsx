import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Input as IInput,
  IInputProps,
  ITextAreaProps,
  Icon,
  Pressable,
  TextArea,
  useTheme,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { TextMuted, TextNormal } from "../Text/Text";
import { RowBetween } from "../Row/Row";
import Modal from "../Modal/Modal";
import { useModal } from "@hooks";
import { Column } from "../Column/Column";
import Touch from "../Touch/Touch";

interface SelectProps<T> {
  data: any[];
  label?: string;
  onChange: (item: any) => void;
  extraTitle?: string;
}

function Select<F>({ label, data, onChange, extraTitle }: SelectProps<F>) {
  const [selectedItem, setSelectedItem] = useState(data[0]);
  const { isOpen, closeModal, openModal } = useModal();

  const onSelect = (item: any) => {
    setSelectedItem(item);
    closeModal();
    onChange(item);
  };

  // useEffect(() => {
  //   closeModal();
  //   // onChange(selectedItem);
  // }, [selectedItem]);

  return (
    <>
      {label && <TextMuted mb={1}>{label}</TextMuted>}
      <Pressable onPress={openModal}>
        <Box
          borderWidth={0.4}
          backgroundColor="transparent"
          borderColor="border.muted"
          height="10"
          pr={2}
          borderRadius={5}
        >
          <RowBetween flex={1}>
            <Icon
              as={Ionicons}
              style={{
                marginLeft: 10,
              }}
              color="text.main"
              name="chevron-down-circle-outline"
              size="md"
            />

            <TextMuted>{selectedItem}</TextMuted>
          </RowBetween>
        </Box>
      </Pressable>

      <Modal isOpen={isOpen} isSheet onClose={closeModal}>
        <Column>
          {data.map((item, index) => (
            <Touch
              key={item}
              style={{ marginTop: index === 0 ? 0 : 5 }}
              onPress={() => onSelect(item)}
            >
              <TextNormal textAlign="center" p={2}>
                {`${item} ${extraTitle || ""}`}
              </TextNormal>
            </Touch>
          ))}
        </Column>
      </Modal>
    </>
  );
}
export default Select;
