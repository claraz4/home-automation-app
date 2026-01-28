import { AppText } from "@/src/shared/ui/AppText";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { borderRadius, colors, spaces } from "@/src/theme";

interface InfoBoxProps {
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export default function InfoBox({
  style,
  title,
  subtitle,
  titleStyle,
}: InfoBoxProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.primary[500],
          borderRadius: borderRadius.md,
          padding: spaces.sm,
        },
        style,
      ]}
    >
      <AppText variant="bodyWhite" style={titleStyle}>
        {title}
      </AppText>
      <View style={{ flexDirection: "row" }}>
        <Heading variant="h4" style={{ color: "white" }}>
          {subtitle}
        </Heading>
      </View>
    </View>
  );
}
