import { Button, Column, Container, Input } from "@components";
import React from "react";
import BaseImage from "./components/GuestBackgroundImage";
import useSendCode from "./hooks/useSendCode";

const Phone = () => {
  const { handlePhoneChange, handleSendCode, isLoading } = useSendCode();

  return (
    <Container bodyPadded={false} pt={4}>
      <Column space={3} p={3}>
        <Input
          onChangeText={handlePhoneChange}
          keyboardType="numeric"
          maxLength={11}
          placeholder="شماره موبایل"
          icon="call-outline"
        />
        <Button
          scheme="secondary"
          onPress={handleSendCode}
          title="مرحله بعد"
          isLoading={isLoading}
        />
      </Column>
      <BaseImage />
    </Container>
  );
};

export default Phone;
