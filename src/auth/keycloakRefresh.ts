import { getTokens, saveTokens, clearTokens } from "./tokenStorage";
import { isJwtExpired } from "./jwt";
import axios from "axios";

const CLIENT_ID = process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID;
const TOKEN_URL = `${process.env.EXPO_PUBLIC_KEYCLOAK_URL}/protocol/openid-connect/token`;

// Single-flight lock to prevent concurrent refresh calls
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const { refreshToken } = await getTokens();
  if (!refreshToken) {
    throw { fatal: true }; // session is dead
  }

  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: CLIENT_ID!,
      refresh_token: refreshToken,
    });

    const res = await axios.post(TOKEN_URL, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token, id_token } = res.data;

    if (!access_token) {
      throw { fatal: false };
    }

    await saveTokens({
      access_token,
      refresh_token: refresh_token ?? refreshToken, // rotation-safe
      id_token,
    });

    return access_token;
  } catch (err: any) {
    const oauthError = err?.response?.data?.error;

    if (oauthError === "invalid_grant") {
      throw { fatal: true };
    }

    throw { fatal: false };
  }
}

export async function getValidAccessToken(): Promise<string | null> {
  const { accessToken } = await getTokens();
  if (!accessToken) return null;

  if (!isJwtExpired(accessToken)) return accessToken;

  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function forceRefreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

export async function logoutLocal() {
  await clearTokens();
}
