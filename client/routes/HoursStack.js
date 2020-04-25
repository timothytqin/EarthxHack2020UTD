import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Hours from "../screens/hours/Hours";
import Detail from "../screens/hours/HoursDetail";
import AddHours from "../screens/hours/AddHours";
import ViewAttachment from "../components/ViewAttachment";

const Stack = createStackNavigator();

export default function HoursStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Hours" component={Hours} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="AddHours" component={AddHours} />
      <Stack.Screen name="ViewAttachment" component={ViewAttachment} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
