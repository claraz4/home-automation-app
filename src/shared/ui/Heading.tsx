import { Text, TextProps } from "react-native";
import { fontStyle, headings } from "../../theme";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends TextProps {
    variant: Variant;
}

export function Heading({ style, variant, ...props }: HeadingProps) {
    return <Text {...props} style={[headings[variant], style, fontStyle]} />;
}
