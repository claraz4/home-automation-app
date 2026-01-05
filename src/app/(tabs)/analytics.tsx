import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Analytics() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analytics</Text>
      <Text>Try.</Text>
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
