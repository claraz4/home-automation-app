import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { colors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenViewProps extends ViewProps {
  safe?: boolean;
}

export default function ScreenView({
  style,
  safe = false,
  ...props
}: ScreenViewProps) {
  if (safe) {
    return (
      <SafeAreaView {...props} style={[style, screenViewStyles.commonStyle]} />
    );
  } else {
    return <View {...props} style={[style, screenViewStyles.commonStyle]} />;
  }
}

const screenViewStyles = StyleSheet.create({
  commonStyle: {
    backgroundColor: colors.primary[25],
    justifyContent: "flex-start",
  },
});
