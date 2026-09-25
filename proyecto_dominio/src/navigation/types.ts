import type { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
    route: string;
    originStation: string;
    destinationStation: string;
    duration: number;
    ticketPrice: number;
    subtitle: string;
  };
  CreateRoute: undefined;
  EditRoute: { id: string };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Favorites: undefined;
  Profile: undefined;
  Settings: undefined;
};