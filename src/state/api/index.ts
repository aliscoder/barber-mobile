import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

// export const baseURL = "http://192.168.1.149:4000";
// export const baseURL = "http://192.168.1.117:4000";
export const baseURL = "http://192.168.34.234:4000";
// export const baseURL = "https://barber.iran.liara.run";

const { getItem: getItemAsync } = createSecureStore();

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: async (headers) => {
    let token = Platform.OS === "web" ? localStorage.getItem("token") : await getItemAsync("token");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const Api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Appointments", "Messages", "Reviews", "ClientSamples", "Pending", "Schedule"],
});

export default Api;
