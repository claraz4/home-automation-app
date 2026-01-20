import axios from "axios";
import { TokenResponse } from "./authTypes";

type ExchangeParams = {
  code: string;
  codeVerifier: string;
  redirectUri: string;
  clientId: string;
  keycloakUrl: string;
};

export async function exchangeCodeForToken({
  code,
  codeVerifier,
  redirectUri,
  clientId,
  keycloakUrl,
}: ExchangeParams): Promise<TokenResponse | undefined> {
  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
    });

    // returns error 400 with "invalid_grant" if it fails
    const { data } = await axios.post<TokenResponse>(
      `${keycloakUrl}/protocol/openid-connect/token`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    ); // returns access_token,expires_in,refresh_expires_in, refresh_token, token_type, id_token...

    return data;
  } catch (error) {
    console.warn("Token exchange failed", error);
    return;
  }
}

export async function fetchUserInfo(keycloakUrl: string, accessToken: string) {
  try {
    const { data } = await axios.get(
      `${keycloakUrl}/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.warn("User info fetch failed", error);
    return;
  }
}
