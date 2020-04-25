import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Header({ text }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1
  },
  left: {
    flex: 1,
    alignItems: "center"
  },
  center: {
    flex: 8,
    alignItems: "center"
  },
  right: {
    flex: 1,
    alignItems: "center"
  }
});
