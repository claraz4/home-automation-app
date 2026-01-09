import {
  View,
  StyleSheet,
  Switch,
  Pressable,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { Href, router } from "expo-router";
import React from "react";

interface FeatureRowProps {
  headingText: string;
  key?: number;
  subtitleText?: string;
  hasSwitch?: boolean;
  status?: boolean; // true if ON; false if OFF
  setStatus?: (status: boolean) => void;
  hasExtraScreen?: boolean;
  extraScreen?: Href;
  hasIcon?: boolean;
  icon?: React.ReactNode;
  iconContainerStyles?: StyleProp<ViewStyle>;
}

export default function FeatureRow({
  key = 0,
  headingText,
  subtitleText,
  hasSwitch,
  status,
  setStatus,
  hasExtraScreen,
  extraScreen,
  hasIcon,
  icon,
  iconContainerStyles,
}: FeatureRowProps) {
  return (
    <View key={key} style={styles.controlContainer}>
      <View style={styles.titleContainer}>
        {hasIcon && (
          <View style={[styles.iconContainer, iconContainerStyles]}>
            {icon}
          </View>
        )}
        <View style={{ rowGap: spaces.xxs }}>
          <Heading variant="h5">{headingText}</Heading>
          {subtitleText && (
            <AppText variant="bodySecondary">{subtitleText}</AppText>
          )}
        </View>
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
          <AppText
            variant="bodySecondary"
            style={[
              styles.statusText,
              status && { color: colors.primary[500] },
            ]}
          >
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
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    columnGap: spaces.md,
    alignItems: "center",
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
  iconContainer: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.sm,
    padding: spaces.xs,
  },
});
