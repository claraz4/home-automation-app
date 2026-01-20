import axios from "axios";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const householdApi = axios.create({
  baseURL: `${BACKEND_URL}/mains/`,
});

export const api = axios.create({
  baseURL: `${BACKEND_URL}/`,
});
