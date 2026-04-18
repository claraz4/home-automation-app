import React, { ReactNode } from "react";
import { AuthProvider } from "@/src/auth/AuthProvider";
import { AuthInterceptorProvider } from "@/src/auth/AuthInterceptorProvider";
import { ScheduleDateEditProvider } from "@/src/features/schedule/providers/ScheduleDateEditProvider";
import { ChatProvider } from "@/src/features/chatbot/providers/ChatProvider";
import { NetworkProvider } from "@/src/providers/NetworkProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <AuthInterceptorProvider>
        <NetworkProvider>
          <ChatProvider>
            <ScheduleDateEditProvider>{children}</ScheduleDateEditProvider>
          </ChatProvider>
        </NetworkProvider>
      </AuthInterceptorProvider>
    </AuthProvider>
  );
}
