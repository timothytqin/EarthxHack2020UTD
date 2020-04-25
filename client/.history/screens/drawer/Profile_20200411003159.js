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
import Toast from "react-native-tiny-toast";

import store from "../../store";
import { updateProfile } from "../../redux/actions";
import { globalStyles } from "../../styles/global";

import Button from "../../components/Button";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";

//Add email and phone # validation
const ProfileSchema = Yup.object({
  studentID: Yup.string().required(),
  email: Yup.string(),
  phoneNumber: Yup.string()
});

export default function Profile({ navigation, route }) {
  const [profile, setProfile] = useState(store.getState().reducer.profile);
  store.subscribe(() => {
    setProfile(store.getState().reducer.profile);
  });

  const updatesProfile = model => {
    fetch(
      constants.server.ngrok + constants.urls.updateUser + "/" + profile._id,
      httpPostOptions(model)
    )
      .then(res => res.json())
      .then(res => {
        store.dispatch(updateProfile(res));
      })
      .then(() => {
        Toast.showSuccess("Your profile has been saved.");
      });
  };

  navigation.setOptions({
    headerTitle: profile.name,
    headerLeft: () => (
      <TouchableOpacity
        style={globalStyles.menu}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={32} />
      </TouchableOpacity>
    )
  });

  return (
    <KeyboardAvoidingView
      style={{ ...globalStyles.container }}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        style={styles.profile}
        onPress={() => Keyboard.dismiss()}
      >
        {profile ? (
          <View style={styles.form}>
            <View style={{ alignItems: "center" }}>
              <Image style={styles.pfp} source={{ uri: profile.thumbnail }} />
            </View>
            <Formik
              initialValues={{
                studentID: !profile.studentID ? "" : profile.studentID,
                email: !profile.email ? "" : profile.email,
                phoneNumber: !profile.phoneNumber ? "" : profile.phoneNumber
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
        ) : (
          <View />
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1
  },
  form: {
    flex: 1
  },
  pfp: {
    width: 100,
    height: 100,
    marginVertical: 10
  },
  save: {
    backgroundColor: "#0f0"
  },
  logout: {
    backgroundColor: "#f00"
  },
  logoutText: {
    color: "#fff"
  }
});
