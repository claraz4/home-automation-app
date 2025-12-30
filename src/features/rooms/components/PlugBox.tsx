import { View, StyleSheet, Pressable } from "react-native";
import { RoomPlugDTO } from "@/src/features/rooms/data/RoomPlugDTO";
import { AppText } from "@/src/shared/ui/AppText";
import { borderRadius, boxShadow, colors, spaces } from "@/src/theme";
import { useState } from "react";
import { Switch } from "react-native-switch";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PlugBoxProps {
  plug: RoomPlugDTO;
}

export default function PlugBox({ plug }: PlugBoxProps) {
  const [isEnabled, setIsEnabled] = useState(plug.isOn);

  return (
    <Pressable style={styles.container} key={plug.plugId}>
      <View style={styles.header}>
        <AppText>{plug.name}</AppText>
        {plug.isConstant && (
          <FontAwesome name="lock" size={24} color={colors.primary[500]} />
        )}
      </View>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        circleSize={24}
        barHeight={24}
        circleBorderWidth={4}
        circleBorderActiveColor={colors.status.success}
        circleBorderInactiveColor={colors.status.fail}
        backgroundActive={colors.status.success}
        backgroundInactive={colors.status.fail}
        circleActiveColor={"white"}
        circleInActiveColor={"white"}
        changeValueImmediately={true}
        innerCircleStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
        renderActiveText={false}
        renderInActiveText={false}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: borderRadius.md,
    padding: spaces.sm,
    rowGap: spaces.sm,
    backgroundColor: "white",
    ...boxShadow.normal,
    flexGrow: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    columnGap: spaces.sm + spaces.xxxs,
    alignItems: "center",
  },
});
