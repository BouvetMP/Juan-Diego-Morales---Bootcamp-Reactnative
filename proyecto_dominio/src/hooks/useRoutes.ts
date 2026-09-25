import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../service/api";
import { mapPostToRoute, mapPostsToRoutes } from "../service/mappers";
import type {
  CableCarRoute,
  CreateRoutePayload,
  UpdateRoutePayload,
  JsonPlaceholderPost,
} from "../types";

export const ROUTES_QUERY_KEY = ["routes"] as const;

export function useRoutes() {
  return useQuery<CableCarRoute[]>({
    queryKey: ROUTES_QUERY_KEY,
    queryFn: async () => {
      const { data } =
        await apiClient.get<JsonPlaceholderPost[]>("/posts?_limit=10");
      return mapPostsToRoutes(data);
    },
  });
}

export function useRouteById(id: string | number) {
  return useQuery<CableCarRoute>({
    queryKey: [...ROUTES_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<JsonPlaceholderPost>(`/posts/${id}`);
      return mapPostToRoute(data);
    },
    enabled: !!id,
  });
}

export function useCreateRoute() {
  const queryClient = useQueryClient();

  return useMutation<CableCarRoute, Error, CreateRoutePayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<JsonPlaceholderPost>("/posts", {
        title: payload.name,
        body: payload.subtitle,
        userId: 1,
      });

      const newRoute: CableCarRoute = {
        id: String(data.id || Date.now()),
        name: payload.name,
        route: payload.route,
        originStation: payload.originStation,
        destinationStation: payload.destinationStation,
        duration: payload.duration,
        ticketPrice: payload.ticketPrice,
        subtitle: payload.subtitle,
      };

      return newRoute;
    },
    onSuccess: (newRoute) => {
      queryClient.setQueryData<CableCarRoute[]>(
        ROUTES_QUERY_KEY,
        (oldRoutes) => {
          return oldRoutes ? [newRoute, ...oldRoutes] : [newRoute];
        },
      );
    },
    onError: (error) => {
      console.error("Error al crear ruta:", error.message);
    },
  });
}

export function useUpdateRoute() {
  const queryClient = useQueryClient();

  return useMutation<CableCarRoute, Error, UpdateRoutePayload>({
    mutationFn: async (payload) => {
      await apiClient.put<JsonPlaceholderPost>(`/posts/${payload.id}`, {
        title: payload.name,
        body: payload.subtitle,
        userId: 1,
      });

      const updatedRoute: CableCarRoute = {
        id: payload.id,
        name: payload.name,
        route: payload.route,
        originStation: payload.originStation,
        destinationStation: payload.destinationStation,
        duration: payload.duration,
        ticketPrice: payload.ticketPrice,
        subtitle: payload.subtitle,
      };

      return updatedRoute;
    },
    onSuccess: (updatedRoute) => {
      queryClient.setQueryData<CableCarRoute[]>(ROUTES_QUERY_KEY, (old) =>
        old
          ? old.map((r) => (r.id === updatedRoute.id ? updatedRoute : r))
          : [updatedRoute],
      );
      queryClient.setQueryData(
        [...ROUTES_QUERY_KEY, updatedRoute.id],
        updatedRoute,
      );
    },
    onError: (error) => {
      console.error("Error al actualizar ruta:", error.message);
    },
  });
}
