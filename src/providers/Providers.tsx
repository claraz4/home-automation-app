import React, { ReactNode } from "react";
import { AuthProvider } from "../auth/AuthContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
