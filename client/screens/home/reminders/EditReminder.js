import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ShadowPropTypesIOS,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import store from "../../../redux/store";
import { addReminder, updateReminder } from "../../../redux/actions/authActions";
import { globalStyles, images } from "../../../styles/global";

import Button from "../../../components/Button";
import { constants } from "../../../shared/constants";
import { httpPostOptions } from "../../../shared/http";

const ReminderSchema = Yup.object({
  reminder: Yup.string().required()
});

export default function EditReminders({ navigation, route }) {
  const edit = !!route.params;
  const saveReminder = reminder => {
    // console.log("Reminder model: " + JSON.stringify(reminder));
    fetch(
      constants.server.ngrok +
        (edit
          ? constants.urls.updateReminder + "/" + reminder._id
          : constants.urls.addReminder),
      httpPostOptions(reminder)
    )
      .then(res => res.json())
      .then(res => {
        if (!edit) store.dispatch(addReminder(res));
        else store.dispatch(updateReminder(res));
      });
  };

  navigation.setOptions({
    headerTitle: (edit ? "Edit" : "Add") + " Reminder"
  });

  return (
    <KeyboardAvoidingView
      style={{ ...globalStyles.container }}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      <View style={styles.editForm}>
        <Formik
          initialValues={
            edit
              ? route.params
              : {
                  comment: ""
                }
          }
          validationSchema={ReminderSchema}
          onSubmit={(values, actions) => {
            values.creatorID = store.getState().reducer.profile._id;
            saveReminder(values);
            actions.resetForm();
            navigation.navigate("Reminders");
          }}
        >
          {props => (
            <View>
              <Text style={styles.editFormText}>Reminder: </Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Reminder"
                onChangeText={props.handleChange("reminder")}
                value={props.values.reminder}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.reminder && props.errors.reminder}
              </Text>
              <Button text="save" onPress={props.handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  editForm: {
    flex: 1,
    justifyContent: "center"
  },
  editFormText: {
    fontWeight: "bold",
    marginLeft: 15
  }
});
