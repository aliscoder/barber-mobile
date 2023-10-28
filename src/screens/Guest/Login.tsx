import { Button, Column, Container, Input } from "@components";
import { LoginScreenRouteProp } from "@navigation/types";
import { useRoute } from "@react-navigation/native";
import React from "react";
import BaseImage from "./components/GuestBackgroundImage";
import useLogin from "./hooks/useLogin";
import useSendCodeAgain from "./hooks/useSendCodeAgain";

const ClientLogin = () => {
  const { params } = useRoute<LoginScreenRouteProp>();
  const { handleInputChange, handleLogin, isLoading } = useLogin(params.type);
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();

  return (
    <Container bodyPadded={false} pt={4}>
      <Column space={3} p={3}>
        <Input
          onChangeText={(text) => handleInputChange("enteredCode", text)}
          keyboardType="numeric"
          maxLength={8}
          placeholder="کد دریافتی"
        />
        {params.type === "barber" && (
          <Input
            onChangeText={(text) => handleInputChange("password", text)}
            placeholder="کلمه عبور"
            secureTextEntry
          />
        )}
        <Button isLoading={isLoading} onPress={handleLogin} scheme="secondary" title="ورود" />
        <Button
          isLoading={againLoading}
          onPress={() => sendCodeAgain(params.phone)}
          scheme="warning"
          isDisabled={timer > 0}
          title={timer > 0 ? `${timer} ثانیه صبر کنید` : "ارسال دوباره کد"}
        />
      </Column>
      <BaseImage />
    </Container>
  );
};

export default ClientLogin;
