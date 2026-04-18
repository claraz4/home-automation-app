import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReactNode } from "react";

interface StatusBoxProps {
  message: string;
  setIsVisible?: (value: boolean) => void;
  title?: string;
  isError?: boolean;
  hasClose?: boolean;
  onClose?: () => void;
  containerStyle?: ViewStyle;
  icon?: ReactNode;
  showTitle?: boolean;
}

export default function StatusBox({
  isError = true,
  title,
  message,
  hasClose = false,
  onClose,
  containerStyle,
  icon,
  showTitle = true,
}: StatusBoxProps) {
  const titleStatus = !title || title === "" ? "Error" : title;

  return (
    <View
      style={[
        styles.container,
        isError ? styles.errorContainer : styles.successContainer,
        containerStyle,
      ]}
    >
      {icon}
      {!icon &&
        (isError ? (
          <MaterialIcons name="error" size={50} color="white" />
        ) : (
          <MaterialIcons name="check-circle" size={50} color="white" />
        ))}
      <View style={styles.subContainer}>
        <View style={styles.headingContainer}>
          {showTitle && (
            <Heading variant="h4" style={{ color: "white" }}>
              {titleStatus}
            </Heading>
          )}
          {hasClose && onClose && (
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color="white" />
            </Pressable>
          )}
        </View>
        <AppText variant="bodyWhite" style={styles.text}>
          {message}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: borderRadius.sm,
    width: "100%",
    padding: spaces.sm,
    columnGap: spaces.sm,
    alignItems: "center",
    outlineColor: "rgba(0,0,0,0.05)",
    outlineWidth: 1,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subContainer: {
    flexDirection: "column",
    flex: 1,
  },
  errorContainer: {
    backgroundColor: colors.status.fail,
  },
  successContainer: {
    backgroundColor: colors.status.success,
  },
  text: {
    flexShrink: 1,
    fontFamily: fontWeight[400],
    textAlign: "left",
  },
});
