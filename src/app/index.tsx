import { Redirect } from "expo-router";
import { useAuth } from "@/src/auth/useAuth";
import { AppText } from "@/src/shared/ui/AppText";
import { detectBackend } from "@/src/api/backendUtils";
import { useEffect, useState } from "react";

export default function Index() {
  const { state } = useAuth();
  const { isSignedIn, isLoading } = state;
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    async function init() {
      await detectBackend();
      setBackendReady(true);
    }

    void init();
  }, []);

  if (isLoading || !backendReady) return <AppText>Loading</AppText>;

  return isSignedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
}
