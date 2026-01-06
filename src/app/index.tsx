import { Redirect } from "expo-router";
import { useAuth } from "@/src/auth/useAuth";
import { AppText } from "@/src/shared/ui/AppText";

export default function Index() {
  const { state } = useAuth();
  const { isSignedIn, isLoading } = state;

  if (isLoading) return <AppText>Loading</AppText>;

  return isSignedIn ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
}
