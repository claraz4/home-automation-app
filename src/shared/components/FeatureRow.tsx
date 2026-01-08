import { View, StyleSheet, Switch, Pressable } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { Href, router } from "expo-router";
import React from "react";

interface FeatureRowProps {
  headingText: string;
  subtitleText?: string;
  hasSwitch?: boolean;
  status?: boolean; // true if ON; false if OFF
  setStatus?: (status: boolean) => void;
  hasExtraScreen?: boolean;
  extraScreen?: Href;
  hasIcon?: boolean;
  icon?: React.ReactNode;
}

export default function FeatureRow({
  headingText,
  subtitleText,
  hasSwitch,
  status,
  setStatus,
  hasExtraScreen,
  extraScreen,
  hasIcon,
  icon,
}: FeatureRowProps) {
  return (
    <View style={styles.controlContainer}>
      {hasIcon && <View>{icon}</View>}
      <View style={{ rowGap: spaces.xxs }}>
        <Heading variant="h5">{headingText}</Heading>
        <AppText variant="bodySecondary">{subtitleText}</AppText>
      </View>
      {hasSwitch && (
        <Switch
          value={status}
          onValueChange={setStatus}
          trackColor={{
            false: colors.gray[300],
            true: colors.primary[500],
          }}
          thumbColor={"#FFFFFF"}
          style={{ transform: [{ scale: 0.8 }] }}
        />
      )}
      {hasExtraScreen && extraScreen && (
        <Pressable
          style={styles.statusContainer}
          onPress={() => router.push(extraScreen)}
        >
          <AppText variant="bodySecondary" style={styles.statusText}>
            {status ? "ON" : "OFF"}
          </AppText>
          <Entypo
            name="chevron-small-right"
            size={30}
            color={colors.gray[400]}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: borderRadius.sm,
    alignItems: "center",
    padding: spaces.sm,
    paddingLeft: spaces.md,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 0.5 * spaces.xxxs,
  },
  statusText: {
    fontFamily: fontWeight[500],
    marginRight: -spaces.xxs,
  },
});
