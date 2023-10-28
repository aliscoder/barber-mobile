import { Button, Column, Container, Input } from "@components";
import React from "react";
import GenderSwitch from "../components/GenderSwitch";
import BaseImage from "../components/GuestBackgroundImage";
import useRegister from "../hooks/useRegister";
import useSendCodeAgain from "../hooks/useSendCodeAgain";

const BarberRegister = () => {
  const { handleInputChange, isLoading, formData, handleRegister } = useRegister("barber");
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();
  return (
    <Container bodyPadded={false} isInSafeArea={0} pt={4}>
      <Column space={3} p={3}>
        <Input
          onChangeText={(text) => handleInputChange("enteredCode", text)}
          keyboardType="numeric"
          value={formData.enteredCode?.toLocaleString()}
          maxLength={8}
          placeholder="کد دریافتی"
        />
        <Column space={3}>
          <Input
            onChangeText={(text) => handleInputChange("shopName", text)}
            placeholder="نام آرایشگاه"
          />

          <Input
            secureTextEntry
            onChangeText={(text) => handleInputChange("password", text)}
            placeholder="کلمه عبور"
          />
          <Input
            secureTextEntry
            onChangeText={(text) => handleInputChange("repassword", text)}
            placeholder="تکرار کلمه عبور"
          />
          <GenderSwitch
            value={formData.gender}
            onChange={() =>
              handleInputChange("gender", formData.gender === "male" ? "female" : "male")
            }
          />
        </Column>
        <Button scheme="secondary" isLoading={isLoading} onPress={handleRegister} title="ثبت نام" />
        <Button
          isLoading={againLoading}
          onPress={() => sendCodeAgain(formData.phone)}
          scheme="warning"
          isDisabled={timer > 0}
          title={timer > 0 ? `${timer} ثانیه صبر کنید` : "ارسال دوباره کد"}
        />
      </Column>
      <BaseImage height={370} />
    </Container>
  );
};

export default BarberRegister;
