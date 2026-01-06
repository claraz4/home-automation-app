import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const tokenStorage = {
  async getAccessToken(): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem("accessToken");
    }
    return await SecureStore.getItemAsync("accessToken");
  },
};

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const api = axios.create({
  baseURL: BACKEND_URL,
});

export const householdApi = axios.create({
  baseURL: `${BACKEND_URL}/mains/`,
});

api.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

householdApi.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
