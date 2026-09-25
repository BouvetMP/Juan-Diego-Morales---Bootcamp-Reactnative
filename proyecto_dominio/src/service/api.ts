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
  return { ...payload, id: String(response.data.id || Date.now()) };
};

export const updateCableRoute = async (
  payload: UpdateRoutePayload,
): Promise<CableCarRoute> => {
  const numericId = Number(payload.id);
  if (!isNaN(numericId) && numericId <= 100) {
    await api.put(`/posts/${payload.id}`, payload);
  }
  return payload as CableCarRoute;
};

export const getRoutes = fetchCableRoutes;
export const createRoute = createCableRoute;
export const updateRoute = updateCableRoute;
