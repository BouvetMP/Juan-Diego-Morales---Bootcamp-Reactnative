export interface CableCarRoute {
  id: string;
  name: string;
  route: string;
  originStation: string;
  destinationStation: string;
  duration: number;
  ticketPrice: number;
  subtitle: string;
}

export interface CreateRoutePayload {
  name: string;
  route: string;
  originStation: string;
  destinationStation: string;
  duration: number;
  ticketPrice: number;
  subtitle: string;
}

export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface UpdateRoutePayload extends CreateRoutePayload {
  id: string;
}
