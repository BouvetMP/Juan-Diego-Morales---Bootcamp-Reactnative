import { NavigatorScreenParams } from "@react-navigation/native";
export interface CableCarRoute {
  id: string;
  name: string;
  route: string;
  originStation: string;
  destinationStation: string;
  duration: number;
  ticketPrice: number;
  subtitle: string;
  lengthKm?: number;
  status?: "operativa" | "mantenimiento" | "suspendida";
  description?: string;
  imageUrl?: string;
  popular?: boolean;
  saved?: boolean;
}

export interface CreateRoutePayload {
  name: string;
  route: string;
  originStation: string;
  destinationStation: string;
  duration: number;
  ticketPrice: number;
  subtitle: string;
  lengthKm?: number;
  status?: "operativa" | "mantenimiento" | "suspendida";
  description?: string;
  imageUrl?: string;
}

export type UpdateRoutePayload = Partial<CreateRoutePayload> & {
  id: string;
};

// --- API DE PRUEBA (JSONPlaceholder) ---
export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// --- AUTENTICACIÓN Y PASAJERO ---
export interface User {
  id: number | string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  operatorCode?: string;
  stationAssigned?: string;
  tuLlaveCard?: string;
  saldo?: number;
  pasajesActivos?: number;
  tipoUsuario?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  HomeTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};
