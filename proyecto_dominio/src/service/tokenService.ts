// src/service/tokenService.ts
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { AuthTokens } from "../types";

const ACCESS_TOKEN_KEY = "cable_bogota_access_token";
const REFRESH_TOKEN_KEY = "cable_bogota_refresh_token";

const isWeb = Platform.OS === "web";

export const saveTokens = async (
  accessTokenOrTokens: string | AuthTokens,
  refreshToken?: string,
): Promise<void> => {
  let access = "";
  let refresh = "";

  if (typeof accessTokenOrTokens === "object" && accessTokenOrTokens !== null) {
    access = accessTokenOrTokens.accessToken;
    refresh = accessTokenOrTokens.refreshToken;
  } else {
    access = accessTokenOrTokens;
    refresh = refreshToken || "";
  }

  if (isWeb) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, access);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  } else {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
  }
};

export const getTokens = async (): Promise<{
  accessToken: string | null;
  refreshToken: string | null;
}> => {
  if (isWeb) {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  } else {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  }
};

export const clearTokens = async (): Promise<void> => {
  if (isWeb) {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
};

export const tokenService = {
  saveTokens,
  getTokens,
  clearTokens,
  getAccessToken: async () => (await getTokens()).accessToken,
};
