import { Pressable, StyleSheet, View } from "react-native";
import { spaces, colors } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import AppModal from "@/src/shared/components/AppModal";

interface ConfirmationMessagePopUpProps {
  headingText: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function ConfirmationMessagePopUp({
  headingText,
  message,
  onConfirm,
  onCancel,
  visible,
  setVisible,
}: ConfirmationMessagePopUpProps) {
  const confirm = () => {
    onConfirm();
    setVisible(false);
  };

  const cancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setVisible(false);
    }
  };

  return (
    <AppModal
      visible={visible}
      setVisible={setVisible}
      isBottom={false}
      headingText={headingText}
      hasCloseButton={false}
    >
      <AppText>{message}</AppText>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={cancel} style={styles.button}>
          <AppText>Cancel</AppText>
        </Pressable>
        <Pressable onPress={confirm} style={styles.button}>
          <AppText style={{ color: colors.primary[500] }}>Confirm</AppText>
        </Pressable>
      </View>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    borderTopColor: colors.gray[200],
    borderTopWidth: 1,
    paddingTop: spaces.sm,
    marginBottom: -spaces.xs,
    marginTop: spaces.sm,
  },
  button: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
