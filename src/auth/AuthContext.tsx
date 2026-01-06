import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  makeRedirectUri,
  Prompt,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type AuthState = {
  isSignedIn: boolean;
  userInfo: Record<string, any> | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

type TokenParams = {
  code: string;
  codeVerifier: string;
  redirectUri: string;
};

const initialState: AuthState = {
  isSignedIn: false,
  userInfo: null,
};

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
    return await SecureStore.getItemAsync(key);
  },

  async del(key: string) {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

async function saveTokens(accessToken: string, idToken: string) {
  await storage.set("accessToken", accessToken);
  await storage.set("idToken", idToken);
}

async function getTokens() {
  const accessToken = await storage.get("accessToken");
  const idToken = await storage.get("idToken");
  return { accessToken, idToken };
}

async function deleteTokens() {
  await storage.del("accessToken");
  await storage.del("idToken");
}

const AuthContext = createContext({
  state: initialState,
  signIn: () => {},
  signOut: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const keycloakUrl = process.env.EXPO_PUBLIC_KEYCLOAK_URL;
  const clientId = process.env.EXPO_PUBLIC_KEYCLOAK_CLIENT_ID;

  if (!keycloakUrl) {
    throw new Error("EXPO_PUBLIC_KEYCLOAK_URL is not defined");
  }

  if (!clientId) {
    throw new Error("EXPO_PUBLIC_KEYCLOAK_CLIENT_ID is not defined");
  }

  const discovery = useAutoDiscovery(keycloakUrl);
  const redirectUri = makeRedirectUri({ preferLocalhost: true });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      redirectUri: redirectUri,
      scopes: ["openid", "profile"],
      prompt: Prompt.Login,
    },
    discovery,
  );

  const [authState, dispatch] = useReducer(
    (previousState: AuthState, action) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...previousState,
            isSignedIn: true,
          };
        case "USER_INFO":
          return {
            ...previousState,
            userInfo: {
              username: action.payload.preferred_username,
              givenName: action.payload.given_name,
              familyName: action.payload.family_name,
              email: action.payload.email,
            },
          };
        case "SIGN_OUT":
          return initialState;
        default:
          return previousState;
      }
    },
    initialState,
  );

  const authContext = useMemo(
    () => ({
      state: authState,
      signIn: () => {
        if (!request) {
          console.warn("Auth request not ready yet");
          return;
        }
        void promptAsync();
      },
      signOut: async () => {
        try {
          const { idToken } = await getTokens();
          await fetch(
            `${keycloakUrl}/protocol/openid-connect/logout?id_token_hint=${idToken}`,
          );
          dispatch({ type: "SIGN_OUT" });
        } catch (e) {
          console.warn(e);
        }
      },
    }),
    [authState, promptAsync],
  );

  useEffect(() => {
    const getPayload = async ({
      code,
      codeVerifier,
      redirectUri,
    }: TokenParams) => {
      try {
        const formData = {
          grant_type: "authorization_code",
          client_id: clientId,
          code: code,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        };

        const formBody: string[] = [];
        for (const property in formData) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(
            formData[property as keyof typeof formData],
          );
          formBody.push(encodedKey + "=" + encodedValue);
        }

        const response = await fetch(
          `${keycloakUrl}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.join("&"),
          },
        );
        if (response.ok) {
          return await response.json();
        }
      } catch (e) {
        console.warn(e);
      }
    };

    if (response?.type === "success" && request?.codeVerifier) {
      const { code } = response.params;
      const run = async () => {
        const payload = await getPayload({
          code,
          codeVerifier: request.codeVerifier!,
          redirectUri,
        });
        dispatch({ type: "SIGN_IN", payload });
        await saveTokens(payload.access_token, payload.id_token);
      };

      void run();
    } else if (response?.type === "error") {
      console.warn("Authentication error: ", response.error);
    }
  }, [dispatch, redirectUri, request?.codeVerifier, response]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { accessToken } = await getTokens();
        const response = await fetch(
          `${keycloakUrl}/protocol/openid-connect/userinfo`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + accessToken,
              Accept: "application/json",
            },
          },
        );
        if (response.ok) {
          const payload = await response.json();
          dispatch({ type: "USER_INFO", payload });
        }
      } catch (e) {
        console.warn(e);
      }
    };
    if (authState.isSignedIn) {
      void getUserInfo();
    }
  }, [authState.isSignedIn, dispatch]);

  useEffect(() => {}, [response, request?.codeVerifier]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
