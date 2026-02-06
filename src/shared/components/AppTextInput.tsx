import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { borderRadius, colors, spaces } from "@/src/theme";
import { useState } from "react";

interface AppTextInput {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  containerStyle?: ViewStyle;
  inputContainerStyle?: TextStyle;
  hasError?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export default function AppTextInput({
  label,
  value,
  onChange,
  containerStyle,
  inputContainerStyle,
  hasError = false,
  keyboardType = "default",
}: AppTextInput) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Heading variant="h6" style={{ color: colors.gray[700] }}>
          {label}
        </Heading>
      )}
      <TextInput
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChange}
        style={[
          styles.textInputContainer,
          focus && styles.textInputContainerOnFocus,
          hasError && styles.errorBorders,
          inputContainerStyle,
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: spaces.xxs,
  },
  textInputContainer: {
    backgroundColor: "white",
    borderColor: colors.gray[300],
    padding: spaces.xs + spaces.xxs,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    fontSize: 18,
  },
  textInputContainerOnFocus: {
    borderColor: colors.primary[400],
    outlineColor: colors.primary[400],
  },
  errorBorders: {
    borderColor: colors.status.fail,
    borderWidth: 2,
    outlineColor: colors.status.fail,
  },
});
