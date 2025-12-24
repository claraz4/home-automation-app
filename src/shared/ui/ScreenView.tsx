import React from "react";
import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

interface ScreenViewProps extends ViewProps {
  safe?: boolean;
  scroll?: boolean;
  children?: React.ReactNode;
}

export default function ScreenView({
  style,
  safe = true,
  scroll = true,
  children,
  ...props
}: ScreenViewProps) {
  const Container = scroll ? ScrollView : View;

  if (safe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Container
          {...props}
          style={[styles.common, style]}
          contentContainerStyle={scroll ? styles.contentContainer : undefined}
        >
          {children}
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <Container
      {...props}
      style={[styles.common, style]}
      contentContainerStyle={scroll ? styles.contentContainer : undefined}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  common: {
    backgroundColor: colors.primary[25],
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
});
