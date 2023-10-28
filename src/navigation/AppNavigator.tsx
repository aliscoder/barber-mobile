import { getPushDataObject } from "native-notify";
import React, { useEffect } from "react";
import { useAuth, useBarberNavigator, useClientNavigator } from "../hooks";
import BarberNavigator from "./BarberNavigator";
import ClientNavigator from "./ClientNavigator";
import GuestNavigator from "./GuestNavigator";

const AppNavigator = () => {
  const { user, isBarber } = useAuth();

  const { navigateToAppt: toBarberAppt } = useBarberNavigator();
  const { navigateToAppt: toClientAppt } = useClientNavigator();

  const pushNotificationData = getPushDataObject();

  useEffect(() => {
    if (pushNotificationData.apptId) {
      if (isBarber) {
        toBarberAppt(pushNotificationData.apptId);
      } else {
        toClientAppt(pushNotificationData.apptId);
      }
    }
  }, [pushNotificationData]);

  return user ? isBarber ? <BarberNavigator /> : <ClientNavigator /> : <GuestNavigator />;
};

export default AppNavigator;
