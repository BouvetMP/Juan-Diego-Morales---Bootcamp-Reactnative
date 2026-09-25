import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchCableRoutes,
  createCableRoute,
  updateCableRoute,
} from "../service/api";
import {
  CableCarRoute,
  CreateRoutePayload,
  UpdateRoutePayload,
} from "../types/index";

export const ROUTES_QUERY_KEY = ["routes"];
const ROUTES_CACHE_KEY = "@cable_bogota_routes_cache";

export const useRoutes = () => {
  const [isOfflineData, setIsOfflineData] = useState(false);

  const query = useQuery<CableCarRoute[]>({
    queryKey: ROUTES_QUERY_KEY,
    queryFn: async () => {
      try {
        const data = await fetchCableRoutes();
        // Guardar copia en caché local
        await AsyncStorage.setItem(ROUTES_CACHE_KEY, JSON.stringify(data));
        setIsOfflineData(false);
        return data;
      } catch (error) {
        console.warn(
          "⚠️ Falló la conexión a internet. Intentando cargar caché offline...",
          error,
        );
        const cached = await AsyncStorage.getItem(ROUTES_CACHE_KEY);
        if (cached) {
          setIsOfflineData(true);
          return JSON.parse(cached) as CableCarRoute[];
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  return {
    ...query,
    isOfflineData,
  };
};

export const useRouteById = (id: string) => {
  const { data: routes } = useRoutes();
  return routes?.find((r: CableCarRoute) => r.id === id);
};

export const useCreateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRoute: CreateRoutePayload) => createCableRoute(newRoute),
    onSuccess: (createdRoute: CableCarRoute) => {
      queryClient.setQueryData<CableCarRoute[]>(ROUTES_QUERY_KEY, (old) => {
        if (!old) return [createdRoute];
        return [createdRoute, ...old];
      });
    },
  });
};

export const useUpdateRoute = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRoutePayload) => updateCableRoute(payload),
    onSuccess: (updatedRoute: CableCarRoute) => {
      queryClient.setQueryData<CableCarRoute[]>(ROUTES_QUERY_KEY, (old) => {
        if (!old) return [updatedRoute];
        return old.map((route: CableCarRoute) =>
          route.id === updatedRoute.id ? updatedRoute : route,
        );
      });
    },
  });
};
