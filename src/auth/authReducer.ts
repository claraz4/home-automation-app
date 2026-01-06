import { AuthAction, AuthState } from "./authTypes";

export const initialAuthState: AuthState = {
  isSignedIn: false,
  userInfo: null,
  isLoading: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, isSignedIn: true, isLoading: true };

    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: {
          username: action.payload.preferred_username,
          givenName: action.payload.given_name,
          familyName: action.payload.family_name,
          email: action.payload.email,
        },
        isLoading: false,
      };

    case "SIGN_OUT":
      return initialAuthState;

    case "RESTORE_DONE":
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
