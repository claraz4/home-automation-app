import { TokenResponse } from "./authTypes";
import { storage } from "@/src/shared/utils/storage";

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
