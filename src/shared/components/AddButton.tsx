import { router } from "expo-router";
import { AppText } from "@/src/shared/ui/AppText";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors, fontWeight } from "@/src/theme";

interface AddButtonProps {
  onPress: () => void;
}

export default function AddButton({ onPress }: AddButtonProps) {
  return (
    <Pressable style={styles.addButton} onPress={onPress}>
      <AppText style={styles.addButtonText}>+</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.primary[500],
    borderRadius: "50%",
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
    fontFamily: fontWeight[500],
    lineHeight: 40,
  },
});
