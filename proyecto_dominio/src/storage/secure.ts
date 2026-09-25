import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const OPERATOR_CODE_KEY = "cable_bogota_operator_code";

export const saveOperatorCode = async (code: string): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(OPERATOR_CODE_KEY, code);
    } else {
      await SecureStore.setItemAsync(OPERATOR_CODE_KEY, code);
    }
  } catch (error) {
    console.error("Error guardando código de operador:", error);
    throw error;
  }
};

export const getOperatorCode = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(OPERATOR_CODE_KEY);
    }
    return await SecureStore.getItemAsync(OPERATOR_CODE_KEY);
  } catch (error) {
    console.error("Error leyendo código de operador:", error);
    return null;
  }
};

export const deleteOperatorCode = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(OPERATOR_CODE_KEY);
    } else {
      await SecureStore.deleteItemAsync(OPERATOR_CODE_KEY);
    }
  } catch (error) {
    console.error("Error eliminando código de operador:", error);
  }
};
