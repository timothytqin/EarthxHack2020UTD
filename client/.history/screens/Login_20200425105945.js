import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import Formik from "formik";
import Yup from "yup";

import store from "../store";
import { globalStyles, images } from "../styles/global";
import { googleAuth, login, getGoogleProfile } from "../auth";
import Button from "../components/Button";

const LoginSchema = Yup.object({
  email: Yup.string().required(),
  phoneNumber: Yup.string().required()
});

export default function Login({ navigation }) {
  return (
    <TouchableOpacity style={{ ...globalStyles.container, ...styles.form }} onPress>
      <Image style={styles.logo} source={images.UTD_LOGO} />
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
            <Button
              text="Save"
              buttonStyle={styles.save}
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
    </TouchableOpacity>
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
