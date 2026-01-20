import { Tabs, useRouter } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors, spaces } from "../../theme";
import { StyleSheet } from "react-native";
import { useAuth } from "@/src/auth/useAuth";
import { useEffect } from "react";

export default function Layout() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isSignedIn) {
      router.replace("/login");
    }
  }, [state.isSignedIn]);

  if (!state.isSignedIn) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.gray[400],
        headerShown: false,
        tabBarStyle: layoutStyles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Octicons
              name="home-fill"
              size={size}
              color={color}
              style={{ marginTop: spaces.xxs }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          title: "Schedules",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="calendar-month"
              size={size + 5}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics-sharp" size={size + 5} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const layoutStyles = StyleSheet.create({
  tabBar: {
    paddingTop: spaces.xs,
  },
});
