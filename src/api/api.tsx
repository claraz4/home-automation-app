import axios from "axios";
import {
  forceRefreshAccessToken,
  getValidAccessToken,
  logoutLocal,
} from "@/src/auth/keycloakRefresh";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const createApi = (baseURL: string) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use(
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

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        original._retry = true;

        try {
          const token = await forceRefreshAccessToken();
          original.headers.Authorization = `Bearer ${token}`;
          return instance(original);
        } catch {
          await logoutLocal();
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

export const householdApi = createApi(`${BACKEND_URL}/mains/`);
export const api = createApi(`${BACKEND_URL}/`);
