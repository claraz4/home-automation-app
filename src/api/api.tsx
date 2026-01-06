import axios from "axios";
import {
  forceRefreshAccessToken,
  getValidAccessToken,
  logoutLocal,
} from "@/src/auth/keycloakRefresh";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const householdApi = axios.create({
  baseURL: `${BACKEND_URL}/mains/`,
});

householdApi.interceptors.request.use(
  async (config) => {
    const token = await getValidAccessToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

householdApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const token = await forceRefreshAccessToken();
        original.headers.Authorization = `Bearer ${token}`;
        return householdApi(original);
      } catch {
        await logoutLocal();
      }
    }

    return Promise.reject(error);
  },
);
