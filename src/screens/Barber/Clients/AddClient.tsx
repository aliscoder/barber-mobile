import { Button, Card, Column, Container, Input, List, RowBetween, TextNormal } from "@components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useToast } from "@hooks";
import { useAddClientMutation } from "@state/api/barber";
import { Icon } from "native-base";
import React, { useEffect, useState } from "react";

const AddClient = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();

  const [addClient, { isLoading, isSuccess, isError, error }] = useAddClientMutation();

  const handleAddClient = () => {
    const regex = RegExp("09(0[1-9]|1[0-9]|3[0-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}");
    if (!regex.test(phone) || phone.trim().length !== 11) {
      showError("شماره موبایل نامعتبر است");
    } else if (name.length < 1) {
      showError("نام وارد شده نامعتبر است");
    } else {
      addClient({ name, phone, gender: user.gender, barberId: user._id });
    }
  };

  useEffect(() => {
    if (isError && error) {
      //@ts-ignore
      showError(error.data.error);
    }
    if (isSuccess) {
      setPhone("");
      setName("");
      showSuccess("پیام دعوت برای مشتری ارسال شد");
    }
  }, [isSuccess, isError]);

  return (
    <Container headerTitle="ثبت نام مشتری">
      <Card
        transparent
        title="ثبت نام مشتری"
        subtitle="مشخصات مشتری را  وارد کنید و مشتری به آرایشگاه شما اضافه خواهد شد"
        pb={3}
      >
        <Column space={2}>
          <Input label="نام مشتری" value={name} onChangeText={(t) => setName(t)} />
          <Input
            keyboardType="numeric"
            maxLength={11}
            label="شماره موبایل مشتری"
            value={phone}
            onChangeText={(t) => setPhone(t)}
          />
          <Button
            isLoading={isLoading}
            mt={3}
            scheme="success"
            title="ثبت مشتری "
            onPress={handleAddClient}
          />
        </Column>
      </Card>
      {user.clients.filter((client) => client.invited).length > 0 && (
        <Card
          mt={5}
          title="لیست مشتریان دعوت شده"
          subtitle="مشتری های دعوت شده با اولین ورود به کابر فعل تبدیل میشوند"
        >
          <List
            data={user.clients.filter((client) => client.invited)}
            renderItem={({ item, index }) => (
              <RowBetween mt={index === 0 ? 0 : 5}>
                <Icon as={MaterialCommunityIcons} name="check" size="md" color="success" />
                <TextNormal>{item.name}</TextNormal>
              </RowBetween>
            )}
          />
        </Card>
      )}
    </Container>
  );
};

export default AddClient;
