import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, AuthTokens } from "../types";
import { tokenService } from "../service/tokenService";
import { authService } from "../service/authService";
import { LoginSchemaType, RegisterSchemaType } from "../schemas/authSchema";

export interface RegisteredUser extends User {
  passwordHash: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  registeredUsers: RegisteredUser[];
  error: string | null;

  login: (data: LoginSchemaType) => Promise<boolean>;
  register: (data: RegisterSchemaType) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  rechargeSaldo: (amount: number) => void; 
  setHydrated: (state: boolean) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,
      registeredUsers: [],
      error: null,

      setHydrated: (state: boolean) => set({ isHydrated: state }),
      clearError: () => set({ error: null }),

      rechargeSaldo: (amount: number) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            saldo: (currentUser.saldo || 0) + amount,
          };
          set({ user: updatedUser });
        }
      },

      login: async (credentials: LoginSchemaType) => {
        set({ isLoading: true, error: null });
        try {
          const { registeredUsers } = get();

          const localUser = registeredUsers.find(
            (u) =>
              u.username.toLowerCase() === credentials.username.toLowerCase() ||
              u.email.toLowerCase() === credentials.username.toLowerCase(),
          );

          if (localUser) {
            if (localUser.passwordHash === credentials.password) {
              const mockTokens: AuthTokens = {
                accessToken: `local_access_${Date.now()}`,
                refreshToken: `local_refresh_${Date.now()}`,
              };

              await tokenService.saveTokens(mockTokens);

              const { passwordHash, ...userSession } = localUser;
              set({
                user: userSession,
                isAuthenticated: true,
                isLoading: false,
              });
              return true;
            } else {
              set({ error: "Contraseña incorrecta", isLoading: false });
              return false;
            }
          }

          const response = await authService.loginApi(
            credentials.username,
            credentials.password,
          );

          const tokens: AuthTokens = {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          };
          await tokenService.saveTokens(tokens);

          const userProfile: User = {
            id: response.id,
            username: response.username,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            gender: response.gender,
            image: response.image,
            tuLlaveCard: "1000-0084-9201-3392",
            saldo: 18500,
            pasajesActivos: 4,
            tipoUsuario: "Pasajero Frecuente",
          };

          set({
            user: userProfile,
            isAuthenticated: true,
            isLoading: false,
          });

          return true;
        } catch (err: unknown) {
          let errorMessage =
            "Error al iniciar sesión. Verifica tus credenciales.";
          if (err && typeof err === "object" && "response" in err) {
            const axiosErr = err as {
              response?: { data?: { message?: string } };
            };
            if (axiosErr.response?.data?.message) {
              errorMessage = axiosErr.response.data.message;
            }
          }
          set({
            error: errorMessage,
            isLoading: false,
          });
          return false;
        }
      },

      register: async (data: RegisterSchemaType) => {
        set({ isLoading: true, error: null });
        try {
          const currentList = get().registeredUsers;

          const exists = currentList.some(
            (u) =>
              u.username.toLowerCase() === data.username.toLowerCase() ||
              u.email.toLowerCase() === data.email.toLowerCase(),
          );

          if (exists) {
            set({
              error: "El usuario o correo ya se encuentra registrado",
              isLoading: false,
            });
            return false;
          }

          const newUser: RegisteredUser = {
            id: Date.now().toString(),
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            tuLlaveCard: data.tuLlaveCard || "1000-4820-9102-1100",
            saldo: 10000,
            pasajesActivos: 2,
            tipoUsuario: "Pasajero Frecuente",
            passwordHash: data.password,
            image: "https://dummyjson.com/icon/emilys/128",
          };

          set({
            registeredUsers: [...currentList, newUser],
            isLoading: false,
          });

          return true;
        } catch {
          set({
            error: "Ocurrió un error al registrar el pasajero",
            isLoading: false,
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        await tokenService.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuthStatus: async () => {
        try {
          const token = await tokenService.getAccessToken();
          const currentUser = get().user;

          if (!token || !currentUser) {
            await tokenService.clearTokens();
            set({ isAuthenticated: false, user: null });
            return;
          }

          set({ isAuthenticated: true, user: currentUser });
        } catch {
          await tokenService.clearTokens();
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: "cable-bogota-auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        registeredUsers: state.registeredUsers,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);