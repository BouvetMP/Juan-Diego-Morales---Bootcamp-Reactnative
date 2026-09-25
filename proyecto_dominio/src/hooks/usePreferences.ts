import { create } from "zustand";
import {
  UserPreferences,
  DEFAULT_PREFERENCES,
  savePreferences,
  loadPreferences,
} from "../storage/preferences";

interface PreferencesState {
  preferences: UserPreferences;
  isLoaded: boolean;
  loadInit: () => Promise<void>;
  updatePreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K],
  ) => Promise<void>;
}

export const usePreferences = create<PreferencesState>((set, get) => ({
  preferences: DEFAULT_PREFERENCES,
  isLoaded: false,
  loadInit: async () => {
    const prefs = await loadPreferences();
    set({ preferences: prefs, isLoaded: true });
  },
  updatePreference: async (key, value) => {
    const newPrefs = { ...get().preferences, [key]: value };
    set({ preferences: newPrefs });
    await savePreferences(newPrefs);
  },
}));
