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

type AuthState = {
  isSignedIn: boolean;
  accessToken: string | null;
  idToken: string | null;
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
  accessToken: null,
  idToken: null,
  userInfo: null,
};

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
  const redirectUri = makeRedirectUri();
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
            accessToken: action.payload.access_token,
            idToken: action.payload.id_token,
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
        console.log("Starting login");
        console.log("Redirect URI:", redirectUri);
        console.log("Auth request:", request);
        if (!request) {
          console.warn("Auth request not ready yet");
          return;
        }
        void promptAsync();
      },
      signOut: async () => {
        try {
          const idToken = authState.idToken;
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
    const getToken = async ({
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
        console.log("REDIRECT URI USED:", redirectUri);

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
          const payload = await response.json();
          dispatch({ type: "SIGN_IN", payload });
        }
      } catch (e) {
        console.warn(e);
      }
    };

    if (response?.type === "success" && request?.codeVerifier) {
      const { code } = response.params;
      const run = async () => {
        const token = await getToken({
          code,
          codeVerifier: request.codeVerifier!,
          redirectUri,
        });
        console.log(token);
      };

      void run();
    } else if (response?.type === "error") {
      console.warn("Authentication error: ", response.error);
    }
  }, [dispatch, redirectUri, request?.codeVerifier, response]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const accessToken = authState.accessToken;
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
          console.log(payload);
          dispatch({ type: "USER_INFO", payload });
        }
      } catch (e) {
        console.warn(e);
      }
    };
    if (authState.isSignedIn) {
      void getUserInfo();
    }
  }, [authState.accessToken, authState.isSignedIn, dispatch]);

  useEffect(() => {
    console.log("Auth response:", response);
    console.log("Code verifier:", request?.codeVerifier);
  }, [response, request?.codeVerifier]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
