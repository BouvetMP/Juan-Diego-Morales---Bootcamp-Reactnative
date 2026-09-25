// src/service/api.ts
import axios from "axios";
import {
  CableCarRoute,
  CreateRoutePayload,
  UpdateRoutePayload,
} from "../types/index";
import { mapPostsToRoutes } from "./mappers";
import { getTokens, saveTokens, clearTokens } from "./tokenService";
import { useAuthStore } from "../stores/authStore";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const { accessToken } = await getTokens();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { refreshToken } = await getTokens();
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post("https://dummyjson.com/auth/refresh", {
          refreshToken,
          expiresInMins: 30,
        });

        const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
        await saveTokens(newAccess, newRefresh);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest); // Reintentar petición original
      } catch (refreshError) {
        await clearTokens();
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const fetchCableRoutes = async (): Promise<CableCarRoute[]> => {
  const response = await api.get("/posts?_limit=10");
  return mapPostsToRoutes(response.data);
};

export const createCableRoute = async (
  payload: CreateRoutePayload,
): Promise<CableCarRoute> => {
  const response = await api.post("/posts", payload);
  // JSONPlaceholder siempre responde con id: 101. Asignamos Date.now() para asegurar ID único local
  const uniqueId = String(Date.now());
  return {
    ...payload,
    id: uniqueId,
  };
};

export const updateCableRoute = async (
  payload: UpdateRoutePayload,
): Promise<CableCarRoute> => {
  const numericId = Number(payload.id);

  // JSONPlaceholder solo admite PUT real en IDs 1 a 100
  if (!isNaN(numericId) && numericId <= 100) {
    const response = await api.put(`/posts/${payload.id}`, payload);
    return {
      ...(payload as CableCarRoute),
      ...response.data,
      id: String(payload.id),
    };
  }

  // Rutas locales creadas durante la sesión (id > 100 o timestamp)
  console.info(
    `[updateCableRoute] La ruta con ID "${payload.id}" es local. Se actualiza en caché/estado sin petición al mock.`,
  );

  return payload as CableCarRoute;
};

export const getRoutes = fetchCableRoutes;
export const createRoute = createCableRoute;
export const updateRoute = updateCableRoute;