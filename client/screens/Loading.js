import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import store from "../redux/store";
import { images } from "../styles/global";

export default function Loading({ route, navigation }) {
  const authenticated = useSelector(state => state.auth.authenticated);
  useEffect(() => {
    navigation.navigate(authenticated ? "App" : "Login");
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
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
