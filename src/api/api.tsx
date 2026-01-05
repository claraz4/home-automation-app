import axios from "axios";

const BACKEND_URL =
  process.env.EXPO_PUBLIC_BACKEND_URL ??
  `http://${process.env.EXPO_PUBLIC_HOST_IP}:5000`;

export const api = axios.create({
  baseURL: BACKEND_URL,
});

export const householdApi = axios.create({
  baseURL: `${BACKEND_URL}/mains/`,
});
