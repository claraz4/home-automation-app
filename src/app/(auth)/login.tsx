import { StyleSheet, View } from "react-native";
import React from "react";
import { useAuth } from "@/src/auth/useAuth";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Redirect } from "expo-router";
import { borderRadius, colors, spaces } from "@/src/theme";
import Button from "@/src/shared/components/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";

export default function Login() {
  const { state, signIn } = useAuth();
  const { isSignedIn, isLoading } = state;

  if (isLoading) return null;

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <ScreenView safe={false} style={styles.container}>
      <View
        style={{
          justifyContent: "space-between",
          height: "70%",
          marginTop: "15%",
        }}
      >
        <View style={styles.introContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="energy-savings-leaf"
              size={90}
              color={"white"}
            />
          </View>
          <View style={styles.textContainer}>
            <Heading variant="h1" style={{ color: "white" }}>
              Smart Home
            </Heading>
            <AppText
              variant="body"
              style={{
                color: "rgba(255, 255, 255, 0.78)",
                textAlign: "center",
                wordWrap: "wrap",
              }}
            >
              Power control that works even when electricity doesn't.
            </AppText>
          </View>
        </View>
        <Button
          text="Sign In"
          onPress={signIn}
          style={{ padding: spaces.md }}
        />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary[500],
    padding: spaces.xl,
    justifyContent: "center",
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: borderRadius.lg,
    padding: spaces.md,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    boxShadow: `0 0 50px 20px rgba(255,255,255,0.2)`,
  },
  introContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: spaces.xl,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: spaces.sm,
  },
});
