import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import Formik from "formik";

import store from "../store";
import { globalStyles, images } from "../styles/global";
import { googleAuth, login, getGoogleProfile } from "../auth";
import Button from "../components/Button";

export default function Login({ navigation }) {
  return (
    <View style={{ ...globalStyles.container, ...styles.form }}>
      <Image style={styles.logo} source={images.UTD_LOGO} />
      <Formik
        initialValues={{
          email: "",
          password: !profile.phoneNumber ? "" : profile.phoneNumber
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, actions) => {
          updatesProfile(values);
          Keyboard.dismiss();
        }}
      >
        {props => (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={globalStyles.inputLabel}>Student ID:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Student ID"
              onChangeText={props.handleChange("studentID")}
              value={props.values.studentID}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.studentID && props.errors.studentID}
            </Text>
            <Text style={globalStyles.inputLabel}>Personal Email:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Personal Email"
              onChangeText={props.handleChange("email")}
              value={props.values.email}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <Text style={globalStyles.inputLabel}>Phone #:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Phone #"
              onChangeText={props.handleChange("phoneNumber")}
              value={props.values.phoneNumber}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.phoneNumber && props.errors.phoneNumber}
            </Text>
            <Button
              text="Save"
              buttonStyle={styles.save}
              onPress={props.handleSubmit}
            />
          </View>
        )}
      </Formik>
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
