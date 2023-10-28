import { Card, Column, Container, Row, RowBetween, TextNormal, TextTiny, Touch } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { baseURL } from "@state/api";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, ScrollView, View, useTheme } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Info = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const { navigateInShop } = useBarberNavigator();
  return (
    <Container hasHeader={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View pb={3}>
          <Card
            leftTitleElement={
              <Touch onPress={() => navigateInShop({ screen: "About" })}>
                <Icon as={Ionicons} name="pencil" size="md" color="success" />
              </Touch>
            }
            title="مشخصات"
            // padding={2}
          >
            <Column space={4}>
              <TextTiny lineHeight="2xl">{user.bio}</TextTiny>
              <RowBetween mt={4}>
                <Row space={2}>
                  <Icon as={Ionicons} name="call-outline" color="text.secondary" size="sm" />
                  <TextTiny color="text.muted">{user.phone}</TextTiny>
                </Row>
              </RowBetween>
            </Column>
          </Card>

          <Card
            leftTitleElement={
              <Touch onPress={() => navigateInShop({ screen: "Location" })}>
                <Icon as={Ionicons} name="pencil" size="md" color="success" />
              </Touch>
            }
            title="آدرس"
            padding={2}
            mt={5}
            shadowed={false}
          >
            <Column space={2}>
              <ImageBackground
                source={{ uri: `${baseURL}/Map.jpg` }}
                style={{
                  width: "100%",
                  height: 155,
                  paddingHorizontal: 10,
                  position: "relative",
                }}
              >
                <LinearGradient
                  colors={[theme.colors.black, "transparent"]}
                  style={styles.gradBottom}
                  start={{ x: 1, y: 1.5 }}
                  end={{ x: 0, y: 1.5 }}
                />
                <Column space={3} height="full">
                  <View p={2}>
                    <TextTiny color="text.light">{user.name}</TextTiny>
                    <TextTiny color="text.light">{user.address}</TextTiny>
                  </View>
                </Column>
              </ImageBackground>
            </Column>
          </Card>

          <Card
            leftTitleElement={
              <Touch onPress={() => navigateInShop({ screen: "Service" })}>
                <Icon as={Ionicons} name="pencil" size="md" color="success" />
              </Touch>
            }
            title="روز و ساعات کاری"
            mt={5}
            padding={2}
          >
            <Column>
              <Row justifyContent="space-around" mt={5}>
                <Column alignItems="center">
                  <TextNormal color="text.secondary">استراحت</TextNormal>
                  {user.workTime?.map((item) => (
                    <TextTiny key={item.day} color="text.main" my={2}>
                      {item.rest.start} - {item.rest.end}
                    </TextTiny>
                  ))}
                </Column>
                <Column alignItems="center">
                  <TextNormal color="text.secondary">ساعات کاری</TextNormal>
                  {user.workTime?.map((item) => (
                    <TextTiny key={item.day} color="text.main" my={2}>
                      {item.start} - {item.end}
                    </TextTiny>
                  ))}
                </Column>

                <Column>
                  <TextNormal color="text.secondary">روز هفته</TextNormal>
                  {user.workTime?.map((item) => (
                    <TextTiny key={item.day} color="text.main" my={2}>
                      {item.day}
                    </TextTiny>
                  ))}
                </Column>
              </Row>
            </Column>
          </Card>
        </View>
      </ScrollView>
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
