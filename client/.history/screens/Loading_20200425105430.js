import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import store from "../store";
import { images } from "../styles/global";

export default function Loading({ route, navigation }) {
  navigation.navigate(
    !store.getState().reducer.authenticated ? "Login" : "App"
  );
  store.subscribe(() => {
    navigation.navigate(
      !store.getState().reducer.authenticated ? "Login" : "App"
    );
  });

  return (
    <View style={styles.loading}>
      {/* <Image source={images.loading} resizeMode="contain" /> */}
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
