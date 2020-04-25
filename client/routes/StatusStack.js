import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Status from "../screens/Status";

const Stack = createStackNavigator();

export default function StatusStack() {
  return (
    <Stack.Navigator initialRouteName="Status">
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
