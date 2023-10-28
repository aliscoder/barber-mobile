import { Background, Container } from "@components";
import { usePhoto } from "@hooks";
import { ProfileRouteProp } from "@navigation/types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import Info from "./Info";
import Reviews from "./Reviews";
import Sample from "./Sample";
import Services from "./Services";
import TopTabOptions from "./TopTabOptions";
const BarberProfileTopTab = createMaterialTopTabNavigator();

const BarberProfile = () => {
  const { params } = useRoute<ProfileRouteProp>();
  const theme = useTheme();
  const { BarberHeader } = usePhoto();
  return (
    <Container isInSafeArea={false} px={0} hasHeader={false}>
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
          children={() => <Info id={params.id} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "نظرات" }}
          name="Reviews"
          children={() => <Reviews id={params.id} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "خدمات" }}
          name="Services"
          children={() => <Services id={params.id} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "نمونه کار" }}
          name="Sample"
          children={() => <Sample id={params.id} />}
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
export default BarberProfile;
