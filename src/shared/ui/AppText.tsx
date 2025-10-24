import { Text, TextProps } from "react-native";
import { fontStyle, text } from "../../theme";

type Variant = "body" | "bodySecondary";

interface AppTextProps extends TextProps {
  variant?: Variant;
}

export function AppText({ style, variant = "body", ...props }: AppTextProps) {
  return <Text {...props} style={[text[variant], style, fontStyle]} />;
}
