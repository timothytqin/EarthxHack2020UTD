import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import store from "../store";
import { globalStyles, images } from "../styles/global";
import { googleAuth, login, getGoogleProfile } from "../auth";
import Button from "../components/Button";

export default function Login({ navigation }) {
  return (
    <View style={{ ...globalStyles.container, ...styles.form }}>
      <Image style={styles.logo} source={images.UTD_LOGO} />
      <Button
        text="Sign in with Google"
        onPress={async () => {
          // await googleAuth();
          const profile = await getGoogleProfile();
          // console.log("Queried Profile: " + JSON.stringify(profile));
          await login(profile);
          if (store.getState().reducer.profile._id) navigation.navigate("App");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#00f"
  },
  logo: {
    height: 250,
    width: 250
  }
});
