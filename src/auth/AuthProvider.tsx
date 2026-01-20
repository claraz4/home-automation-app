import React, { ReactNode, useEffect, useMemo, useReducer } from "react";
import {
  makeRedirectUri,
  Prompt,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";

import { AuthContext } from "./AuthContext";
import { authReducer, initialAuthState } from "./authReducer";
import { exchangeCodeForToken, fetchUserInfo } from "./keycloak";
import { clearTokens, getTokens, saveTokens } from "./tokenStorage";
import { getValidAccessToken } from "@/src/auth/keycloakRefresh";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const keycloakUrl = process.env.EXPO_PUBLIC_KEYCLOAK_URL!;
  const clientId = process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID!;

  const discovery = useAutoDiscovery(keycloakUrl);
  const redirectUri = makeRedirectUri({ preferLocalhost: true });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      redirectUri,
      scopes: ["openid", "profile"],
      prompt: Prompt.Login,
    },
    discovery,
  );

  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Verify the tokens and check the user state
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await getValidAccessToken();

        if (!token) {
          throw new Error("No valid session");
        }

        dispatch({ type: "SIGN_IN" });
      } catch {
        await clearTokens();
        dispatch({ type: "SIGN_OUT" });
      } finally {
        dispatch({ type: "RESTORE_DONE" });
      }
    };

    void bootstrap();
  }, []);

  // Sign in and save tokens if available
  useEffect(() => {
    if (response?.type !== "success" || !request?.codeVerifier) return;

    const run = async () => {
      const tokens = await exchangeCodeForToken({
        code: response.params.code,
        codeVerifier: request.codeVerifier!,
        redirectUri,
        clientId,
        keycloakUrl,
      });
      if (!tokens) return;

      await saveTokens(tokens);
      dispatch({ type: "SIGN_IN" });
    };

    void run();
  }, [response, request?.codeVerifier]);

  // Fetch user info if the user is signed in
  useEffect(() => {
    if (!state.isSignedIn) return;

    const run = async () => {
      const { accessToken } = await getTokens();
      if (!accessToken) return;

      const userInfo = await fetchUserInfo(keycloakUrl, accessToken);
      if (!userInfo) return;

      dispatch({ type: "SET_USER_INFO", payload: userInfo });
    };

    void run();
  }, [state.isSignedIn]);

  // Define the state and the signIn and signOut functions
  const value = useMemo(
    () => ({
      state,
      signIn: () => request && promptAsync(),
      signOut: async () => {
        const { idToken } = await getTokens();
        if (idToken) {
          await fetch(
            `${keycloakUrl}/protocol/openid-connect/logout?id_token_hint=${idToken}`,
          );
        }
        await clearTokens();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    [state, request],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
