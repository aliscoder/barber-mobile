import { Card, Column, Container, Error, Loading, Map, Row, RowAround } from "@components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useToast } from "@hooks";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useAddBarberMutation, useGetBarberInfoQuery } from "@state/api/client";
import * as Sharing from "expo-sharing";
import { HStack, Icon, Pressable, ScrollView, Spinner, Text } from "native-base";
import React, { useEffect } from "react";
import { Linking, Platform, StyleSheet } from "react-native";

type Props = {
  id: string;
};
const Info: React.FC<Props> = ({ id }) => {
  const { navigate } = useNavigation<ClientScreenNavigationProp>();
  const { user } = useAuth();

  const {
    isLoading: pageLoading,
    isError: pageError,
    data: info,
    refetch,
  } = useGetBarberInfoQuery(id);
  const { showError } = useToast();
  const [addBarber, { isLoading, isError }] = useAddBarberMutation();

  const addBarberToList = () => {
    addBarber({ barberId: id, clientId: user._id, removeMode: false });
  };

  const removeBarberFromList = () => {
    addBarber({ barberId: id, clientId: user._id, removeMode: true });
  };

  function renderBarberExistance() {
    return user.barbers.map((barber) => barber._id).includes(id) ? (
      <Pressable onPress={removeBarberFromList}>
        <Column alignItems="center" space={2}>
          {isLoading ? (
            <Spinner size={16} color="danger" />
          ) : (
            <Icon as={Ionicons} size="sm" name="person-remove" color="danger" />
          )}
          <Text textAlign="center" width={20} color="danger">
            حذف از لیست
          </Text>
        </Column>
      </Pressable>
    ) : (
      <Pressable onPress={addBarberToList}>
        <Column alignItems="center" space={2}>
          {isLoading ? (
            <Spinner size={16} color="success" />
          ) : (
            <Icon as={Ionicons} size="sm" name="person-add" color="success" />
          )}
          <Text textAlign="center" width={20} color="success">
            اضافه کردن
          </Text>
        </Column>
      </Pressable>
    );
  }

  const handleShare = async () => {
    const url = "tg://msg?text='hel'";
    await Sharing.shareAsync(url);
  };

  useEffect(() => {
    isError && showError("خطا در برقراری ارتباط");
  }, [isError]);
  return pageLoading ? (
    <Loading />
  ) : pageError || !info ? (
    <Error />
  ) : (
    <Container hasHeader={false} px={3} pb={2}>
      <Column space={5} height="full">
        <Card>
          <RowAround>
            {renderBarberExistance()}
            <Pressable onPress={() => navigate("Reservation", { barberId: id })}>
              <Column alignItems="center" space={2}>
                <Icon as={Ionicons} name="bookmark" size="sm" color="text.secondary" />
                <Text color="text.secondary">دریافت نوبت</Text>
              </Column>
            </Pressable>

            <Pressable onPress={handleShare}>
              <Column alignItems="center" space={2}>
                <Icon as={Ionicons} name="share" size="sm" color="text.secondary" />
                <Text color="text.secondary">اشتراک گذاری</Text>
              </Column>
            </Pressable>
          </RowAround>
        </Card>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card title="مشخصات" padding={2}>
            <Column space={4}>
              <Text color="text.main" fontSize="sm" lineHeight="2xl">
                {info.bio}
              </Text>
              <RowAround mt={4}>
                <Row space={2} alignItems="center">
                  <Icon as={Ionicons} name="call-outline" color="text.secondary" size="sm" />
                  <Text fontSize="sm" color="text.muted">
                    {info.phone}
                  </Text>
                </Row>
                <Row space={4} alignItems="center">
                  <Icon
                    as={Ionicons}
                    name="call"
                    onPress={() => Linking.openURL(`tel:${info.phone}`)}
                    color="text.secondary"
                    size="md"
                  />
                  <Icon
                    as={MaterialCommunityIcons}
                    onPress={() => Linking.openURL(`sms:${info.phone}`)}
                    name="message"
                    color="text.secondary"
                    size="md"
                  />
                </Row>
              </RowAround>
            </Column>
          </Card>

          {Platform.OS !== "web" && (
            <Card title="آدرس" padding={2} mt={5} transparent>
              <Map height={155} viewOnly coords={info!.location!.coordinates} />
            </Card>
          )}

          <Card title="روز و ساعات کاری" mt={5} padding={2}>
            <Column>
              <HStack justifyContent="space-around" mt={5}>
                <Column alignItems="center">
                  <Text fontSize="md" color="text.secondary">
                    استراحت
                  </Text>
                  {info.workTime?.map((item) => (
                    <Text key={item.day} fontSize="sm" color="text.main" my={2}>
                      {item.rest.start} - {item.rest.end}
                    </Text>
                  ))}
                </Column>
                <Column alignItems="center">
                  <Text fontSize="md" color="text.secondary">
                    ساعات کاری
                  </Text>
                  {info.workTime?.map((item) => (
                    <Text key={item.day} fontSize="sm" color="text.main" my={2}>
                      {item.start} - {item.end}
                    </Text>
                  ))}
                </Column>

                <Column>
                  <Text fontSize="md" color="text.secondary">
                    روز هفته
                  </Text>
                  {info.workTime?.map((item) => (
                    <Text key={item.day} fontSize="sm" color="text.main" my={2}>
                      {item.day}
                    </Text>
                  ))}
                </Column>
              </HStack>
            </Column>
          </Card>
        </ScrollView>
      </Column>
    </Container>
  );
};
const styles = StyleSheet.create({
  gradBottom: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    width: "70%",
    height: "100%",
  },
});

export default Info;
