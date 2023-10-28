import { useRefreshTokenMutation } from "@state/api/auth";
import { loginUser, logoutUser, updateUser } from "@state/reducers/authReducer";
import { authSelector } from "@state/selectors/authSelector";
import { deleteItem, getItem, setItem } from "@utils";
import jwtDecode from "jwt-decode";
import { useCallback, useEffect } from "react";
import { BarberInterface, ClientInterface, DecodedTokenType } from "../types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export default function useAuth() {
  const { isBarber, theme, user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [refreshToken, { data: newToken, isSuccess: tokenRefreshed }] = useRefreshTokenMutation();

  const checkInitailAuth = useCallback(async () => {
    const token = await getItem("token");
    const decoded = token ? jwtDecode<DecodedTokenType>(token) : null;
    decoded && refreshToken(decoded.user._id);
    dispatch(loginUser(decoded));
  }, []);

  const logout = useCallback(async () => {
    await deleteItem("token");
    dispatch(logoutUser());
  }, []);

  const authenticate = useCallback(async (token: string) => {
    await setItem("token", token);
    const decoded = token ? jwtDecode<DecodedTokenType>(token) : null;
    dispatch(loginUser(decoded));
  }, []);

  const updateToken = useCallback(async (token: string) => {
    await setItem("token", token);
    const decoded = jwtDecode<DecodedTokenType>(token);
    dispatch(updateUser(decoded));
  }, []);

  useEffect(() => {
    if (newToken) {
      updateToken(newToken);
    }
  }, [tokenRefreshed]);

  return {
    theme,
    logout,
    checkInitailAuth,
    authenticate,
    user: user as BarberInterface & ClientInterface,
    isBarber,
  };
}
