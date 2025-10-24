import React from "react";
import { StyleSheet } from "react-native";
import AppHeader from "../../features/home/AppHeader";
import ScreenView from "@/src/shared/ui/ScreenView";

export default function App() {
  return (
    <ScreenView style={styles.container}>
      <AppHeader />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
