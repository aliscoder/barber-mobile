import { usePlatform } from "@hooks";
import { RegisterScreenRouteProp } from "@navigation/types";
import { appointmentHistoryScreenOptions } from "@navigation/utils/options";
import { useRoute } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DEVICE } from "@utils";
import { Box } from "native-base";
import React from "react";
import BarberRegister from "./BarberRegister";
import ClientRegister from "./ClientRegister";

const RegisterTopTab = createMaterialTopTabNavigator();

const RegisterScreen = () => {
  const { params } = useRoute<RegisterScreenRouteProp>();
  const { isIOS } = usePlatform();
  return (
    <Box flex={1} safeAreaTop={!isIOS && 0}>
      <RegisterTopTab.Navigator
        initialLayout={{ width: DEVICE.width }}
        initialRouteName="ClientRegister"
        screenOptions={appointmentHistoryScreenOptions}
      >
        <RegisterTopTab.Screen
          initialParams={params}
          name="ClientRegister"
          options={{ title: "ثبت نام مشتری" }}
          component={ClientRegister}
        />
        <RegisterTopTab.Screen
          initialParams={params}
          name="BarberRegister"
          options={{ title: "ثبت نام آرایشگر" }}
          component={BarberRegister}
        />
      </RegisterTopTab.Navigator>
    </Box>
  );
};
export default RegisterScreen;
