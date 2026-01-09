import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading } from "../../shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { colors, spaces } from "../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";

export default function App() {
  const today = dayjs();
  const todayFullData = `${today.format("dddd")}, ${today.format("MMMM")} ${today.date()}`;

  return (
    <View style={appHeaderStyles.container}>
      <View style={appHeaderStyles.profileInfoContainer}>
        <View style={appHeaderStyles.circle} />
        <View style={appHeaderStyles.userInfoContainer}>
          <Heading variant="h3">Hello, User</Heading>
          <AppText variant="bodySecondary">{todayFullData}</AppText>
        </View>
      </View>
      <Ionicons
        name="notifications"
        size={spaces.xl}
        color={colors.primary[500]}
      />
    </View>
  );
}

const appHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: spaces.sm,
    paddingBottom: spaces.sm,
    paddingRight: spaces.md,
    paddingLeft: spaces.md,
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: colors.gray[300],
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.sm,
  },
  userInfoContainer: {
    flexDirection: "column",
    rowGap: spaces.xxs,
  },
});
