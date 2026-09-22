export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
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
};