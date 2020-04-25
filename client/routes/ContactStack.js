import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Contact from "../screens/drawer/Contact";

const Stack = createStackNavigator();

export default function ContactStack() {
  return (
    <Stack.Navigator initialRouteName="Contact">
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
