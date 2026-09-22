import { create } from 'zustand';
import type { CableCarRoute } from '../types';

interface SavedState {
  savedRoutes: CableCarRoute[];
  addRoute: (route: CableCarRoute) => void;
  removeRoute: (id: string) => void;
  toggleRoute: (route: CableCarRoute) => void;
  clearAll: () => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedRoutes: [],

  addRoute: (route) => {
    const exists = get().savedRoutes.some((r) => r.id === route.id);
    if (exists) return;
    set((state) => ({
      savedRoutes: [...state.savedRoutes, route],
    }));
  },

  removeRoute: (id) => {
    set((state) => ({
      savedRoutes: state.savedRoutes.filter((r) => r.id !== id),
    }));
  },

  toggleRoute: (route) => {
    const exists = get().savedRoutes.some((r) => r.id === route.id);
    if (exists) {
      get().removeRoute(route.id);
    } else {
      get().addRoute(route);
    }
  },

  clearAll: () => set({ savedRoutes: [] }),

  isSaved: (id) => get().savedRoutes.some((r) => r.id === id),
}));