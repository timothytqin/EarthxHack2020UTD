import React from "react";
import { StyleSheet } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Loading from "../screens/Loading";
import Login from "../screens/Login";
import App from "../routes/RootDrawer";

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      Login: Login,
      App: App
    },
    {
      initialRouteName: "Loading"
    }
  )
);

const styles = StyleSheet.create({});
