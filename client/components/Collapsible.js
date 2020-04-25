import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Collapsible({ header, children }) {
  const [open, setOpen] = useState(true);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>{header}</Text>
          {open ? (
            <MaterialIcons
              style={styles.caret}
              name="arrow-drop-up"
              size={32}
            />
          ) : (
            <MaterialIcons
              style={styles.caret}
              name="arrow-drop-down"
              size={32}
            />
          )}
        </View>
      </TouchableOpacity>
      {open && <View style={styles.children}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc"
  },
  headerText: {
    flex: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    padding: 10
  },
  caret: {
    flex: 1,
    marginRight: 5
  },
  children: {
    flex: 1,
    backgroundColor: "#eee"
  }
});
