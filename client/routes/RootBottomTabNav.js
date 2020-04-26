import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import Hours from "./HoursStack";
import Members from "./MemberStack";
import Status from "./StatusStack";

import store from "../redux/store";

const Tab = createBottomTabNavigator();

export default function RootBottomTabNavBar({ navigation, route }) {
  // const [position, setPosition] = useState(
  //   store.getState().reducer.profile.position
  // );

  // store.subscribe(() => {
  //   setPosition(store.getState().reducer.profile.position);
  // });

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Hours"
        component={Hours}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="hourglass-half" size={size - 4} color={color} />
          )
        }}
      />
      {position > 0 && (
        <Tab.Screen
          name="Members"
          component={Members}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="users" size={size - 4} color={color} />
            )
          }}
        />
      )}
      {position == 0 && (
        <Tab.Screen
          name="Status"
          component={Status}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="progress-check"
                size={size - 4}
                color={color}
              />
            )
          }}
        />
      )} */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
