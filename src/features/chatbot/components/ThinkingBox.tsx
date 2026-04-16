import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";

export default function ThinkingBox() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => ++prev % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <AppText style={styles.dotsText}>.</AppText>
      <AppText style={[styles.dotsText, { opacity: idx > 0 ? 1 : 0 }]}>
        .
      </AppText>
      <AppText style={[styles.dotsText, { opacity: idx > 1 ? 1 : 0 }]}>
        .
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[200],
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: spaces.sm,
    flexDirection: "row",
  },
  dotsText: {
    fontSize: 24,
    fontFamily: fontWeight[800],
    color: colors.gray[400],
    letterSpacing: 2,
  },
});
