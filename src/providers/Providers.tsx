import React, { ReactNode } from "react";
import { AuthProvider } from "@/src/auth/AuthProvider";
import { AuthInterceptorProvider } from "@/src/auth/AuthInterceptorProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <AuthInterceptorProvider>{children}</AuthInterceptorProvider>
    </AuthProvider>
  );
}
