import axios from "axios";
import { api, householdApi } from "@/src/api/api";

export async function detectBackend() {
  try {
    await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL!}/health`, {
      timeout: 2000,
    });

    setBackend(true);
  } catch (error) {
    setBackend(false);
  }
}

function setBackend(isLocal: boolean) {
  if (isLocal) {
    api.defaults.baseURL = process.env.EXPO_PUBLIC_BACKEND_URL;
    householdApi.defaults.baseURL = `${process.env.EXPO_PUBLIC_BACKEND_URL}/mains`;
  } else {
    api.defaults.baseURL = process.env.EXPO_PUBLIC_REMOTE_BACKEND_URL;
    householdApi.defaults.baseURL = `${process.env.EXPO_PUBLIC_REMOTE_BACKEND_URL}/mains`;
  }
}
