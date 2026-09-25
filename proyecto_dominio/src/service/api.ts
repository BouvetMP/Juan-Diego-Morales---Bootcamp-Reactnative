import axios from "axios";
import {
  CableCarRoute,
  CreateRoutePayload,
  UpdateRoutePayload,
} from "../types/index";
import { mapPostsToRoutes } from "./mappers";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

export const fetchCableRoutes = async (): Promise<CableCarRoute[]> => {
  const response = await api.get("/posts?_limit=10");
  return mapPostsToRoutes(response.data);
};

export const createCableRoute = async (
  payload: CreateRoutePayload,
): Promise<CableCarRoute> => {
  const response = await api.post("/posts", payload);
  return {
    ...payload,
    id: String(response.data.id || Date.now()),
  };
};

export const updateCableRoute = async (
  payload: UpdateRoutePayload,
): Promise<CableCarRoute> => {
  const numericId = Number(payload.id);
  if (!isNaN(numericId) && numericId <= 100) {
    await api.put(`/posts/${payload.id}`, payload);
  }
  return { ...payload };
};

export const getRoutes = fetchCableRoutes;
export const createRoute = createCableRoute;
export const updateRoute = updateCableRoute;
