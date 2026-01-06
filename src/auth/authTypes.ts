export type UserInfo = {
  username: string;
  givenName?: string;
  familyName?: string;
  email?: string;
};

export type AuthState = {
  isSignedIn: boolean;
  userInfo: UserInfo | null;
};

export type AuthAction =
  | { type: "SIGN_IN" }
  | { type: "SIGN_OUT" }
  | { type: "SET_USER_INFO"; payload: any };

export type TokenResponse = {
  access_token: string;
  id_token: string;
};
