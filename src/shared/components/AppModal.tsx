import { Modal, View, Pressable, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { borderRadius, colors, spaces } from "@/src/theme";
import { Heading, Variant } from "@/src/shared/ui/Heading";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AppModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: ReactNode;
  isBottom: boolean;
  headingVariant?: Variant;
  headingText?: string;
  hasCloseButton?: boolean;
}

export default function AppModal({
  visible,
  setVisible,
  children,
  isBottom = false,
  headingVariant = "h4",
  headingText = "Add Plug to Schedule",
  hasCloseButton = true,
}: AppModalProps) {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={[styles.backdrop, isBottom && styles.backdropBottom]}>
        <View style={[styles.sheet, isBottom && styles.sheetBottom]}>
          <View style={styles.headingContainer}>
            <Heading variant={headingVariant}>{headingText}</Heading>
            {hasCloseButton && (
              <Pressable onPress={() => setVisible(false)}>
                <Ionicons
                  name="close-circle-outline"
                  size={32}
                  color={colors.primary[500]}
                />
              </Pressable>
            )}
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  sheet: {
    width: "90%",
    borderRadius: borderRadius.sm,
    backgroundColor: "white",
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.lg,
    rowGap: spaces.sm,
  },
  backdropBottom: {
    justifyContent: "flex-end",
  },
  sheetBottom: {
    width: "100%",
    borderRadius: borderRadius.lg,
    paddingHorizontal: spaces.lg,
    paddingVertical: spaces.lg,
  },
  headingContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
