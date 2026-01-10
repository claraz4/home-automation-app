import { AppText } from "@/src/shared/ui/AppText";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { borderRadius, spaces, colors, fontWeight } from "@/src/theme";

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button({ style, text, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <AppText
        variant="body"
        style={{
          color: colors.primary[500],
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: spaces.sm,
  },
});
