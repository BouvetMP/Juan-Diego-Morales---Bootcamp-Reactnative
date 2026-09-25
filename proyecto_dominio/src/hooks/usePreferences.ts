// src/hooks/usePreferences.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Preferences {
  isDarkMode: boolean;
  darkMode: boolean;
  showOnlySaved: boolean;
  sortOrder: string;
  showPopular: boolean;
}

export interface PreferencesState {
  isDarkMode: boolean;
  preferences: Preferences;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
  updatePreference: (key: string, value: any) => void;
  loadInit: () => Promise<void>;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      preferences: {
        isDarkMode: true,
        darkMode: true,
        showOnlySaved: false,
        sortOrder: "default",
        showPopular: false,
      },
      toggleDarkMode: () =>
        set((state) => {
          const nextVal = !state.isDarkMode;
          return {
            isDarkMode: nextVal,
            preferences: {
              ...state.preferences,
              isDarkMode: nextVal,
              darkMode: nextVal,
            },
          };
        }),
      setDarkMode: (value: boolean) =>
        set((state) => ({
          isDarkMode: value,
          preferences: {
            ...state.preferences,
            isDarkMode: value,
            darkMode: value,
          },
        })),
      updatePreference: (key: string, value: any) =>
        set((state) => {
          const updated = { ...state.preferences, [key]: value };
          if (key === "isDarkMode" || key === "darkMode") {
            updated.isDarkMode = Boolean(value);
            updated.darkMode = Boolean(value);
          }
          return {
            preferences: updated,
            isDarkMode: updated.isDarkMode,
          };
        }),
      loadInit: async () => {},
    }),
    {
      name: "cable-bogota-preferences",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const usePreferences = usePreferencesStore;
