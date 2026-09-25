import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const QUICK_RECHARGE_PIN_KEY = "cable_bogota_quick_recharge_pin";

export const saveQuickRechargePin = async (pin: string): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(QUICK_RECHARGE_PIN_KEY, pin);
    } else {
      await SecureStore.setItemAsync(QUICK_RECHARGE_PIN_KEY, pin);
    }
  } catch (error) {
    console.error("Error guardando PIN de recarga rápida:", error);
    throw error;
  }
};

export const getQuickRechargePin = async (): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(QUICK_RECHARGE_PIN_KEY);
    }
    return await SecureStore.getItemAsync(QUICK_RECHARGE_PIN_KEY);
  } catch (error) {
    console.error("Error leyendo PIN de recarga rápida:", error);
    return null;
  }
};

export const deleteQuickRechargePin = async (): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(QUICK_RECHARGE_PIN_KEY);
    } else {
      await SecureStore.deleteItemAsync(QUICK_RECHARGE_PIN_KEY);
    }
  } catch (error) {
    console.error("Error eliminando PIN de recarga rápida:", error);
  }
};