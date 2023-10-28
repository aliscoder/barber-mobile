import { useInitialAssets } from "@hooks";
import {
  AndroidImportance,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import moment from "jalali-moment";
import registerNNPushToken from "native-notify";
import React from "react";
import { Provider } from "react-redux";
import Entrance from "./Entrance";
import store from "./src/state/store";

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

setNotificationChannelAsync("default", {
  name: "default",
  importance: AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C",
});

moment.locale("fa");
moment.updateLocale("fa", {
  weekdays: ["یکشنبه", "دوشنبه", "سشنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],
});
SplashScreen.preventAutoHideAsync();
// NativeModules.DevSettings.setIsDebuggingRemotely(false);

export default function App() {
  registerNNPushToken(10431, "V8wgDzCPu2WtVabIlLPuuD");

  const { fontLoaded } = useInitialAssets();

  return <Provider store={store}>{fontLoaded && <Entrance />}</Provider>;
}
