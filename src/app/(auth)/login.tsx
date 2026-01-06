import { AppText } from "@/src/shared/ui/AppText";
import { Pressable } from "react-native";
import React from "react";
import { useAuth } from "@/src/auth/useAuth";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Redirect } from "expo-router";

export default function Login() {
  const { state, signIn } = useAuth();
  const { isSignedIn, isLoading } = state;

  if (isLoading) return null;

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <ScreenView>
      <Pressable onPress={signIn}>
        <AppText>Sign in</AppText>
      </Pressable>
    </ScreenView>
  );
}
