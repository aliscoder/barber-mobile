import { Background, Container } from "@components";
import { useAuth, usePhoto } from "@hooks";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabOptions from "@screens/Client/BarberProfile/TopTabOptions";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Info from "./Info";
import Review from "./Review";
import Samples from "./Samples";
import Services from "./Services";

const BarberProfileTopTab = createMaterialTopTabNavigator();

const Profile = () => {
  const theme = useTheme();
  const { BarberHeader } = usePhoto();
  const { user } = useAuth();
  return (
    <Container px={0} isInSafeArea={false} hasHeader={false}>
      <Background
        placholder={BarberHeader}
        imageOpacity={1}
        style={{
          width: "100%",
          height: 270,
          borderWidth: 0,
          position: "relative",
        }}
      >
        <LinearGradient
          colors={[theme.colors.primary, "transparent"]}
          style={styles.gradBottom}
          start={{ x: 0, y: 1.0 }}
          end={{ x: 0, y: 0 }}
        />
        <LinearGradient
          colors={[theme.colors.primary, "transparent"]}
          style={styles.gradTop}
          start={{ x: 1.0, y: 0 }}
          end={{ x: 1.0, y: 1.0 }}
        />
      </Background>
      <BarberProfileTopTab.Navigator screenOptions={TopTabOptions}>
        <BarberProfileTopTab.Screen
          options={{ title: "مشخصات" }}
          name="Info"
          children={() => <Info />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "نظرات" }}
          name="Reviews"
          children={() => <Review />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "خدمات" }}
          name="Services"
          children={() => <Services />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "نمونه کار" }}
          name="Sample"
          children={() => <Samples />}
        />
      </BarberProfileTopTab.Navigator>
    </Container>
  );
};
const styles = StyleSheet.create({
  gradBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  gradTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "40%",
  },
});

export default Profile;
