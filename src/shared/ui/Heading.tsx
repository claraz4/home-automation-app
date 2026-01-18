import {
  Text,
  TextProps,
  View,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import { fontStyle, headings, spaces, colors } from "../../theme";
import AppLink from "@/src/shared/ui/AppLink";
import { Href } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { ReactNode } from "react";

export type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps extends TextProps {
  variant: Variant;
  hasLink?: boolean;
  href?: Href;
  linkPlaceholder?: string;
  hasBackButton?: boolean;
  containerStyles?: ViewStyle;
  hasCustomLinkComponent?: boolean;
  customLinkComponent?: ReactNode;
}

export function Heading({
  style,
  variant,
  hasLink = false,
  href = "/",
  hasBackButton = false,
  linkPlaceholder = "",
  containerStyles,
  hasCustomLinkComponent = false,
  customLinkComponent,
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

  return (
    <View
      style={[
        (hasLink || hasCustomLinkComponent) && styles.linkContainer,
        containerStyles,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {hasBackButton && (
          <Pressable onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={28} color={colors.text} />
          </Pressable>
        )}
        {heading}
      </View>
      {hasCustomLinkComponent && customLinkComponent}
      {hasLink && <AppLink href={href}>{linkPlaceholder}</AppLink>}
    </View>
  );
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
