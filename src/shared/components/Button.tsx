import { AppText } from "@/src/shared/ui/AppText";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { borderRadius, spaces, colors, fontWeight } from "@/src/theme";

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  invertColors?: boolean;
  disabled?: boolean;
}

export default function Button({
  style,
  text,
  onPress,
  invertColors = false,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: disabled
            ? colors.gray[300]
            : invertColors
              ? colors.primary[500]
              : "white",
        },
        style,
      ]}
      disabled={disabled}
    >
      <AppText
        variant="body"
        style={{
          color: disabled
            ? colors.gray[400]
            : invertColors
              ? "white"
              : colors.primary[500],
          fontFamily: fontWeight[500],
          lineHeight: 20,
        }}
      >
        {text}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    padding: spaces.sm,
  },
});
