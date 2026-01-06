import React, { ReactNode } from "react";
import { AuthProvider } from "@/src/auth/AuthProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
