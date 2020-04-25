import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home/Home";
import Reminders from "../screens/home/reminders/Reminders";
import EditReminder from "../screens/home/reminders/EditReminder";
import Events from "../screens/home/events/Events";
import EditEvents from "../screens/home/events/EditEvents";
import EventDetail from "../screens/home/events/EventDetail";
import ViewAttachment from "../components/ViewAttachment";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Reminders" component={Reminders} />
      <Stack.Screen name="EditReminder" component={EditReminder} />
      <Stack.Screen name="Events" component={Events} />
      <Stack.Screen name="EditEvents" component={EditEvents} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="ViewAttachment" component={ViewAttachment} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
