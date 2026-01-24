import React, { ReactNode } from "react";
import { AuthProvider } from "@/src/auth/AuthProvider";
import { AuthInterceptorProvider } from "@/src/auth/AuthInterceptorProvider";
import { ScheduleDateEditProvider } from "@/src/features/schedule/providers/ScheduleDateEditProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <AuthInterceptorProvider>
        <ScheduleDateEditProvider>{children}</ScheduleDateEditProvider>
      </AuthInterceptorProvider>
    </AuthProvider>
  );
}
