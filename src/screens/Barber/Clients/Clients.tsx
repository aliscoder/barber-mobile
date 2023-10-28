import {
  Avatar,
  Card,
  Column,
  Container,
  List,
  Row,
  RowBetween,
  TextMuted,
  TextTiny,
  Touch,
} from "@components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { ClientInterface } from "@types";
import { Icon } from "native-base";
import React, { useCallback } from "react";
import { Linking } from "react-native";

const Clients = () => {
  const { user } = useAuth();
  const { navigateToBroadcast, navigateToAddClient } = useBarberNavigator();

  const clientItem = useCallback(
    ({ item, index }: { item: Partial<ClientInterface>; index: number }) => {
      return (
        <Card>
          <Row space={3} justifyContent="flex-end">
            <Column space={1} flex={1}>
              <TextTiny>{item.name}</TextTiny>
              <RowBetween>
                <Row space={2}>
                  <Touch onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                    <Icon as={Ionicons} name="call" color="text.secondary" size="sm" />
                  </Touch>
                  <Touch onPress={() => Linking.openURL(`sms:${item.phone}`)}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="message"
                      color="text.secondary"
                      size="sm"
                    />
                  </Touch>
                </Row>
                <TextMuted>{item.phone}</TextMuted>
              </RowBetween>
            </Column>
            <Avatar size="sm" uri={item.avatar} />
          </Row>
        </Card>
      );
    },
    []
  );

  const Header = () => {
    return (
      <Row space={2}>
        <Touch onPress={navigateToAddClient}>
          <Icon as={Ionicons} name="person-add-outline" size="md" color="secondary" />
        </Touch>
        <Touch onPress={navigateToBroadcast}>
          <Icon as={Ionicons} name="radio-outline" size="md" color="secondary" />
        </Touch>
      </Row>
    );
  };

  return (
    <Container headerTitle="مشتری های شما" headerLeftElement={<Header />}>
      <List data={user.clients.filter((client) => !client.invited)} renderItem={clientItem} />
    </Container>
  );
};

export default Clients;
