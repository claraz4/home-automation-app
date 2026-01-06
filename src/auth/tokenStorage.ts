import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenResponse } from "./authTypes";

const storage = {
  async set(key: string, value: string) {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },

  async get(key: string) {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },

  async remove(key: string) {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export async function saveTokens(tokens: TokenResponse) {
  await storage.set("accessToken", tokens.access_token);
  await storage.set("refreshToken", tokens.refresh_token);
  await storage.set("idToken", tokens.id_token);
}

export async function getTokens() {
  return {
    accessToken: await storage.get("accessToken"),
    refreshToken: await storage.get("refreshToken"),
    idToken: await storage.get("idToken"),
  };
}

export async function clearTokens() {
  await storage.remove("accessToken");
  await storage.remove("refreshToken");
  await storage.remove("idToken");
}
