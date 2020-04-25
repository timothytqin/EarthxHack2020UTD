import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Member from "../screens/members/Members";
import MemberDetail from "../screens/members/MemberDetail";

const Stack = createStackNavigator();

export default function MemberStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Member">
      <Stack.Screen name="Member" component={Member} />
      <Stack.Screen name="MemberDetail" component={MemberDetail} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
