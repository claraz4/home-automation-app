import {
  Text,
  TextProps,
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { fontStyle, headings, spaces, colors, boxShadow } from "../../theme";
import AppLink from "@/src/shared/ui/AppLink";
import { Href } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends TextProps {
  variant: Variant;
  hasLink?: boolean;
  href?: Href;
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
  linkPlaceholder = "",
  containerStyles,
  ...props
}: HeadingProps) {
  const heading = (
    <View style={[{ flexShrink: 1 }, hasBackButton && styles.backHeading]}>
      <Text
        {...props}
        style={[
          fontStyle,
          headings[variant],
          style,
          hasBackButton && styles.backHeading,
        ]}
      />
    </View>
  );
  const navigation = useNavigation();

  if (!hasBackButton && !hasLink) {
    return heading;
  } else if (hasLink) {
    return (
      <View style={[styles.linkContainer, containerStyles]}>
        {heading}
        <AppLink href={href}>{linkPlaceholder}</AppLink>
      </View>
    );
  } else {
    return (
      <View style={[styles.backContainer, containerStyles]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={28} color={colors.text} />
        </Pressable>
        {heading}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spaces.xs,
    paddingHorizontal: spaces.xs,
  },
  backHeading: {
    marginLeft: spaces.sm,
  },
});
