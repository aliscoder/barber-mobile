import { Avatar, Background, Button, Column, Container, Input } from "@components";
import { useAuth, useImagePicker, usePhoto, useToast } from "@hooks";
import { useUpdateProfileMutation } from "@state/api/client";
import { Center, View } from "native-base";
import React, { useEffect, useState } from "react";

const EditAccount = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const { showError, showSuccess } = useToast();
  const { pickImage, image: avatar } = useImagePicker();
  const [updateProfile, { isLoading, isError, isSuccess, data }] = useUpdateProfileMutation();

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      showSuccess("اطلاعات با موفقیت بروزرسانی شد");
    }
  }, [isError, isSuccess]);

  function handleEdit() {
    const regex = RegExp("09(0[1-9]|1[0-9]|3[0-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}");
    if (!regex.test(phone) || phone.trim().length !== 11) {
      showError("شماره موبایل نامعتبر است", "bottom");
    } else if (name.length < 2) {
      showError("نام وارد شده معتبر نیست");
    } else {
      const data = {
        clientId: user._id,
        phone,
        name,
        avatar,
      };
      updateProfile(data);
    }
  }
  const { BarberHeader } = usePhoto();

  return (
    <Container px={4} headerTitle="ویرایش اطلاعات">
      <Column space={4}>
        <View h="2/5">
          <Background style={{ borderWidth: 0 }} size="100%" placholder={BarberHeader}>
            <Center flex={1}>
              <Avatar onPress={pickImage} local={avatar} uri={user.avatar} size="2xl" />
            </Center>
          </Background>
        </View>
        <Input label="نام" minW="full" value={name} onChangeText={(text) => setName(text)} />
        <Input
          label="شماره تماس"
          minW="full"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Button isLoading={isLoading} title="ثبت اطلاعات" onPress={handleEdit} scheme="success" />
      </Column>
    </Container>
  );
};

export default EditAccount;
