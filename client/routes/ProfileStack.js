import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/drawer/Profile";

const Stack = createStackNavigator();

export default function HoursStack() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
