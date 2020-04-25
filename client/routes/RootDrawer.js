import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Root from "./RootBottomTabNav";
import Contact from "./ContactStack";
import FAQ from "./FAQStack";
import Profile from "./ProfileStack";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      edgeWidth={25}
      minSwipeDistance={100}
      drawerStyle={{}}
      drawerContent={props => <DrawerContent {...props} />}
      drawerContentOptions={{}}
    >
      <Drawer.Screen
        name="Root"
        component={Root}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{ drawerLabel: "FAQ" }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{ drawerLabel: "Contact" }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: "My Profile" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
