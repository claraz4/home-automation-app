import { Text, TextProps } from "react-native";
import { fontStyle, text, TextVariant } from "../../theme";

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  opacity?: number;
}

export function AppText({
  style,
  variant = "body",
  opacity = 1,
  ...props
}: AppTextProps) {
  return (
    <Text {...props} style={[text[variant], style, fontStyle, { opacity }]} />
  );
}
