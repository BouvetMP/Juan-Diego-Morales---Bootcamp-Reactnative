// src/service/authService.ts
import axios from "axios";
import { LoginResponse } from "../types";

const AUTH_API_URL = "https://dummyjson.com/auth";

export const loginApi = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${AUTH_API_URL}/login`, {
    username,
    password,
    expiresInMins: 30,
  });
  return response.data;
};

export const refreshTokenApi = async (refreshToken: string) => {
  const response = await axios.post(`${AUTH_API_URL}/refresh`, {
    refreshToken,
    expiresInMins: 30,
  });
  return response.data;
};

export const registerApi = async (data: unknown) => {
  return { id: Date.now(), ...(data as object) };
};

export const authService = {
  loginApi,
  refreshTokenApi,
  registerApi,
};
