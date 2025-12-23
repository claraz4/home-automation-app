import { Text, TextProps, View, StyleSheet, ViewStyle } from "react-native";
import { fontStyle, headings } from "../../theme";
import { AppText } from "@/src/shared/ui/AppText";
import AppLink from "@/src/shared/ui/AppLink";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends TextProps {
  variant: Variant;
  hasLink?: boolean;
  href?: string;
  linkPlaceholder?: string;
  hasBackButton?: boolean;
  prevHref?: string;
  containerStyles?: ViewStyle;
}

export function Heading({
  style,
  variant,
  hasLink = false,
  href = "/",
  hasBackButton = false,
  prevHref = "/",
  linkPlaceholder = "",
  containerStyles,
  ...props
}: HeadingProps) {
  const heading = (
    <Text {...props} style={[headings[variant], style, fontStyle]} />
  );
  if (!hasBackButton && !hasLink) {
    return heading;
  } else if (hasLink) {
    return (
      <View style={[styles.linkContainer, containerStyles]}>
        {heading}
        <AppLink href="/">{linkPlaceholder}</AppLink>
      </View>
    );
  } else {
    return heading; // edit later
  }
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
