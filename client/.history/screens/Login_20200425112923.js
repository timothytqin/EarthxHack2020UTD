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
          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default function Login({ navigation }) {
  return (
    <View style={{ ...globalStyles.container, ...styles.form }}>
      <Text style={styles.headerText}>Plano West Senior High</Text>
      <Image style={styles.logo} source={images.logo} />
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
