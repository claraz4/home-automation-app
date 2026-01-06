import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/src/auth/useAuth";

export default function Settings() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Text>Try.</Text>
      <Pressable onPress={signOut}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
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
    marginBottom: 10,
  },
});
