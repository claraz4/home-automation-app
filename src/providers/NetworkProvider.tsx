import React, { ReactNode, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { NetworkContext } from "@/src/contexts/NetworkContext";
import { networkBridge } from "@/src/helpers/networkBridge";

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    networkBridge.setOffline = setIsOffline;
  }, [setIsOffline]);

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected || state.isInternetReachable === false);
    });
  }, []);

  console.log(isOffline);

  function setOffline(value: boolean) {
    setIsOffline(value);
  }

  return (
    <NetworkContext.Provider
      value={{
        isOffline,
        setOffline,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
