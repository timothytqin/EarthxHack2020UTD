import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import { globalStyles, images } from "../styles/global";

const LoginSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required()
});

export default function Login({ navigation, route }) {
  return (
    <KeyboardAvoidingView
      style={styles.login}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          <View style={{ alignItems: "center" }}>
            <Image style={styles.logo} source={images.UTD_LOGO} />
          </View>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
            }}
          >
            {props => (
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={globalStyles.inputLabel}>Email:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Email"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.email && props.errors.email}
                </Text>
                <Text style={globalStyles.inputLabel}>Password:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.password && props.errors.password}
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import store from "../store";
import { globalStyles, images } from "../styles/global";
import { googleAuth, login, getGoogleProfile } from "../auth";
import Button from "../components/Button";

export default function Login({ navigation }) {
  return (
    <View style={{ ...globalStyles.container, ...styles.form }}>
      <Text style={styles.headerText}>Plano West Senior High</Text>
      <Image style={styles.logo} source={images.logo} />
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
    width: 200
  }
});

// const styles = StyleSheet.create({
//   login: {
//     flex: 1
//   },
//   form: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   logo: {
//     width: 250,
//     height: 250,
//     marginVertical: 10
//   }
// });
