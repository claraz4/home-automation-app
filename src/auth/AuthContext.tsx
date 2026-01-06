import { createContext } from "react";
import { AuthState } from "./authTypes";
import { initialAuthState } from "./authReducer";

export type AuthContextType = {
  state: AuthState;
  signIn: () => void;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  state: initialAuthState,
  signIn: () => {},
  signOut: async () => {},
});
