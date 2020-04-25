import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";

import store from "../store";
import { signOutAsync, getCachedAuthAsync } from "../auth";
import Button from "./Button";

export default function DrawerContent(props) {
  const [profile, setProfile] = useState(store.getState().reducer.profile);

  store.subscribe(() => {
    setProfile(store.getState().reducer.profile);
  });

  const newProps = {
    ...props,
    state: {
      ...props.state,
      routes: props.state.routes.filter(route => route.name !== "Profile")
    }
  };
  // console.log(props.state.routes[props.state.index].name);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...newProps}>
        <View style={styles.header}>
          {/* <Image style={styles.pfp} source={{ uri: profile.thumbnail }} /> */}
          <Text style={styles.boldedText}>{profile.name}</Text>
        </View>
        <DrawerItemList {...newProps} />
        {/* <DrawerItem label="Help" onPress={() => console.log("HALPPPP")} /> */}
      </DrawerContentScrollView>
      <DrawerItem
        focused={props.state.routes[props.state.index].name === "Profile"}
        label="My Profile"
        onPress={() => {
          props.navigation.navigate("Profile");
        }}
      />
      <Button
        text="Logout"
        buttonStyle={{ marginBottom: 15 }}
        onPress={async () => {
          props.navigation.navigate("Home");
          const cachedAuth = await getCachedAuthAsync();
          signOutAsync(cachedAuth);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginVertical: 45
  },
  boldedText: {
    fontWeight: "bold"
  },
  pfp: {
    width: 100,
    height: 100
  }
});
