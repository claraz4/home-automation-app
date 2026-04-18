import { createContext } from "react";

interface NetworkContextType {
  isOffline: boolean;
  setOffline: (value: boolean) => void;
}

export const NetworkContext = createContext<NetworkContextType | null>(null);
