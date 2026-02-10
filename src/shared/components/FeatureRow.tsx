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
import React, { ElementType, ReactNode } from "react";

export interface FeatureRowProps {
  headingText?: string;
  subtitleText?: string;
  hasSwitch?: boolean;
  hasStatus?: boolean;
  hasExtra?: boolean;
  status?: boolean; // true if ON; false if OFF
  setStatus?: (status: boolean) => void;
  setIsExtraClicked?: (isExtraClicked: boolean) => void;
  extraScreen?: Href;
  hasIcon?: boolean;
  icon?: ReactNode;
  iconContainerStyles?: StyleProp<ViewStyle>;
  onRemove?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  hasError?: boolean;
}

export default function FeatureRow({
  headingText,
  subtitleText,
  hasSwitch,
  hasStatus = true,
  status,
  setStatus,
  hasExtra,
  extraScreen,
  hasIcon,
  icon,
  setIsExtraClicked = () => {},
  iconContainerStyles,
  containerStyles,
  onRemove,
  hasError = false,
}: FeatureRowProps) {
  if (hasExtra && onRemove) {
    throw new Error("ERROR: can't have extra and a remove button");
  }

  const Container: ElementType = hasExtra ? Pressable : View;

  return (
    <Container
      style={[
        styles.controlContainer,
        containerStyles,
        hasError && styles.errorBorders,
      ]}
      onPress={
        hasExtra
          ? () => {
              setIsExtraClicked(true);
              if (extraScreen) router.push(extraScreen);
            }
          : undefined
      }
    >
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
      {hasExtra && (
        <View style={styles.statusContainer}>
          {hasStatus && (
            <AppText
              variant="bodySecondary"
              style={[
                styles.statusText,
                status && { color: colors.primary[500] },
              ]}
            >
              {status ? "ON" : "OFF"}
            </AppText>
          )}
          <Entypo
            name="chevron-small-right"
            size={30}
            color={colors.gray[400]}
          />
        </View>
      )}
      {onRemove && (
        <Pressable onPress={onRemove} style={styles.removeContainer}>
          <AppText style={styles.removeText}>-</AppText>
        </Pressable>
      )}
    </Container>
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
  removeContainer: {
    borderRadius: borderRadius.sm,
    width: 26,
    height: 22,
    backgroundColor: colors.status.fail,
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    fontFamily: fontWeight[500],
    fontSize: 25,
    color: "white",
    lineHeight: 29,
  },
  errorBorders: {
    borderColor: colors.status.fail,
    borderWidth: 2,
  },
});
