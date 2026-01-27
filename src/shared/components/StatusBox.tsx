import { Pressable, StyleSheet, View } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

interface StatusBoxProps {
  message: string;
  setIsVisible?: (value: boolean) => void;
  title?: string;
  isError?: boolean;
  hasClose?: boolean;
  onClose?: () => void;
}

export default function StatusBox({
  isError = true,
  title,
  message,
  hasClose = false,
  onClose,
}: StatusBoxProps) {
  const titleStatus = !title || title === "" ? "Error" : title;

  return (
    <View style={[styles.container, isError && styles.errorContainer]}>
      <MaterialIcons name="error" size={50} color="white" />
      <View style={styles.subContainer}>
        <View style={styles.headingContainer}>
          <Heading variant="h4" style={{ color: "white" }}>
            {titleStatus}
          </Heading>
          {hasClose && onClose && (
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={22} color="white" />
            </Pressable>
          )}
        </View>
        <AppText variant="bodyWhite" style={{ flexShrink: 1 }}>
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
});
