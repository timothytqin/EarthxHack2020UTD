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
        <View style={{ ...globalStyles.styles.form }}>
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

const styles = StyleSheet.create({
  login: {
    flex: 1
  },
  form: {
    flex: 1,
    marginVertical: 50
  },
  logo: {
    width: 250,
    height: 250,
    marginVertical: 10
  }
});
