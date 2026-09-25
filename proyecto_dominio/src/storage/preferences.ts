import AsyncStorage from "@react-native-async-storage/async-storage";

export type SortOption = "name" | "duration" | "price";

export interface UserPreferences {
  darkMode: boolean;
  sortOrder: SortOption;
  showPopular: boolean;
  showSavedCount: boolean;
  showOnlySaved: boolean; // 👈 NUEVO FILTRO
}

const PREFERENCES_KEY = "@cable_bogota_user_preferences";

export const DEFAULT_PREFERENCES: UserPreferences = {
  darkMode: true,
  sortOrder: "name",
  showPopular: true,
  showSavedCount: true,
  showOnlySaved: false,
};

export const loadPreferences = async (): Promise<UserPreferences> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PREFERENCES_KEY);
    if (jsonValue != null) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(jsonValue) };
    }
  } catch (e) {
    console.error("Error cargando preferencias:", e);
  }
  return DEFAULT_PREFERENCES;
};

export const savePreferences = async (
  prefs: UserPreferences,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(prefs);
    await AsyncStorage.setItem(PREFERENCES_KEY, jsonValue);
  } catch (e) {
    console.error("Error guardando preferencias:", e);
  }
};
