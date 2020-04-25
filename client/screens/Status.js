import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../store";
import { globalStyles } from "../styles/global";

export default function Status({ navigation, route }) {
  const [hours, setHours] = useState(store.getState().reducer.hours);
  const [validHours, setValidHours] = useState(
    hours
      .filter(hour => hour.valid)
      .reduce((a, b) => parseInt(a.hours) + parseInt(b.hours), 0)
  );

  store.subscribe(() => {
    setHours(store.getState().reducer.hours);
    setValidHours(
      hours
        .filter(hour => hour.valid)
        .reduce((a, b) => parseInt(a.hours) + parseInt(b.hours), 0)
    );
  });

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={globalStyles.menu}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={32} />
      </TouchableOpacity>
    )
  });
  return (
    <View
      style={{
        ...globalStyles.container,
        backgroundColor: validHours >= 15 ? "#9f9" : "#f99",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View
        style={{
          ...styles.circle,
          borderColor: validHours >= 15 ? "#090" : "#900"
        }}
      >
        <Text style={styles.frac}>{validHours}/15</Text>
        <Text style={styles.text}>hours completed</Text>
      </View>
      <Text style={styles.subHeader}>
        {validHours >= 15
          ? "You're good to go!"
          : "Only " + (15 - validHours) + " hours left!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#090",
    justifyContent: "center",
    alignItems: "center"
  },
  frac: {
    fontWeight: "bold",
    fontSize: 42
  },
  text: {
    fontWeight: "bold"
  },
  subHeader: {
    fontWeight: "bold",
    fontSize: 24
  }
});
