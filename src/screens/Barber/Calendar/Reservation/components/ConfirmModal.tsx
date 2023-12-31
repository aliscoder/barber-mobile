import { Button } from "@components";
import { AntDesign } from "@expo/vector-icons";
import { isEqual } from "lodash";
import { Actionsheet, HStack, Icon, KeyboardAvoidingView, VStack } from "native-base";
import React, { memo } from "react";

type Props = {
  isOpen: boolean;
  onReject: () => void;
  onConfirm: () => void;
  onClose: () => void;
  children: React.ReactNode;
};
const ConfirmModal: React.FC<Props> = ({ isOpen, onReject, onConfirm, onClose, children }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} useRNModal>
      <KeyboardAvoidingView w="full" behavior="position" enabled>
        <Actionsheet.Content _dragIndicator={{ background: "text.dark" }} backgroundColor="#FFFFFF">
          <VStack space={4} px={6} alignItems="center" pt={3}>
            <Icon as={AntDesign} name="warning" size="4xl" color="warning" />

            {children}

            <HStack w="1/2" my={3} space={5}>
              <Button title="لغو" onPress={onReject} scheme="danger" />
              <Button title="بله" onPress={onConfirm} scheme="success" />
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
};

export default memo(ConfirmModal, isEqual);
