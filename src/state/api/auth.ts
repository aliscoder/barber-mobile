import { GenderType } from "@types";
import Api from ".";

export interface RegisterFormInterface {
  phone: string;
  shopName: string | undefined;
  name: string | undefined;
  gender: GenderType;
  enteredCode: string;
  password: string;
  repassword: string;
}

export interface LoginFormInterface {
  phone: string;
  enteredCode: string;
  password: string;
}

const authApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    /*
    REFRESH AUTH TOKEN
    */

    refreshToken: builder.mutation<string, string>({
      query: (id) => ({
        url: "/auth/refresh_token",
        method: "POST",
        body: { id },
      }),
    }),

    /*
    SEND VERIFICATION CODE
    */

    checkPhoneExistance: builder.mutation<
      { status: "registered" | "new"; type?: "barber" | "client" },
      { phone: string }
    >({
      query: (body) => ({
        url: "/auth/send_code",
        method: "POST",
        body,
      }),
    }),

    /*
    LOGIN USER
    */

    login: builder.mutation<{ token: string; userId: string }, Partial<LoginFormInterface>>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    /*
    REGISTER USER
    */

    register: builder.mutation<{ token: string; userId: string }, Partial<RegisterFormInterface>>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoginMutation,
  useRegisterMutation,
  useCheckPhoneExistanceMutation,
} = authApi;

export default authApi;
