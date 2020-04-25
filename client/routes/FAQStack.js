import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import FAQ from "../screens/drawer/FAQ";
import FAQDetail from "../screens/drawer/FAQDetail";

const Stack = createStackNavigator();

export default function FAQStack() {
  return (
    <Stack.Navigator initialRouteName="FAQ">
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Details" component={FAQDetail} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
