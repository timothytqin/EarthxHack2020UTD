import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-tiny-toast";

import store from "../../store";
import { addHours, updateHours } from "../../redux/actions";
import { globalStyles, images } from "../../styles/global";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";
import Button from "../../components/Button";
import Popup from "../../components/Popup";

const HoursSchema = Yup.object({
  eventName: Yup.string().required(),
  contactName: Yup.string().required(),
  contact: Yup.string().required(),
  hours: Yup.number()
    .moreThan(0)
    .required(),
  comment: Yup.string()
});

export default function AddHours({ navigation, route }) {
  const add = !route.params;

  const [attachments, setAttachments] = useState(
    route.params && route.params.attachments ? route.params.attachments : []
  );

  const [date, setDate] = useState(
    add ? new Date() : new Date(parseInt(route.params.date))
  );

  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatepickerOpen(Platform.OS === "ios");
    setDate(currentDate);
  };

  const deleteAttachment = attachment => {
    setAttachments(attachments.filter(item => item.name !== attachment.name));
  };

  const addHour = model => {
    // console.log("Hours Model: " + JSON.stringify(model));
    const add = !model._id;
    fetch(
      constants.server.ngrok +
        (add
          ? constants.urls.addHours
          : constants.urls.updateHours + "/" + model._id),
      httpPostOptions(model)
    )
      .then(res => res.json())
      .then(res => {
        if (add) store.dispatch(addHours(res));
        else store.dispatch(updateHours(res));
      });
  };

  navigation.setOptions({ title: add ? "Add Hours" : "Edit Hours" });

  return (
    <KeyboardAvoidingView
      style={{ ...globalStyles.container }}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView style={styles.form}>
          <Formik
            initialValues={
              add
                ? {
                    eventName: "",
                    date: date,
                    contactName: "",
                    contact: "",
                    hours: "",
                    comment: ""
                  }
                : route.params
            }
            validationSchema={HoursSchema}
            onSubmit={(values, actions) => {
              values.hours = "" + values.hours;
              values.volunteer = store.getState().reducer.profile._id;
              values.volunteerName = store.getState().reducer.profile.name;
              values.date = date.getTime();
              values.attachments = attachments;
              values.valid = false;
              values.validatedBy = "";
              values.validatorName = "";
              values.validatedDate = "";
              actions.resetForm();
              addHour(values);
              setDate(new Date());
              navigation.navigate("Hours");
            }}
          >
            {props => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column"
                }}
              >
                <Text style={globalStyles.inputLabel}>Event Name:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Event Name"
                  onChangeText={props.handleChange("eventName")}
                  value={props.values.eventName}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.eventName && props.errors.eventName}
                </Text>
                <Text style={globalStyles.inputLabel}>Event Date:</Text>
                <View style={styles.date}>
                  <TouchableOpacity
                    onPress={() => {
                      setDatepickerOpen(true);
                    }}
                  >
                    <MaterialIcons
                      name="insert-invitation"
                      size={32}
                      color={"#666"}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dateText}>{date.toDateString()}</Text>
                </View>
                {datepickerOpen && Platform.OS === "ios" && (
                  <Popup visible={datepickerOpen} modalOpen={setDatepickerOpen}>
                    <View style={styles.datepicker}>
                      <Text style={styles.labelText}>Date of Volunteering</Text>
                      <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        minimumDate={new Date()}
                        value={date}
                        mode={"date"}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                      />
                      <Button
                        text="Save"
                        onPress={() => setDatepickerOpen(false)}
                      />
                    </View>
                  </Popup>
                )}
                {datepickerOpen && Platform.OS !== "ios" && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    minimumDate={new Date()}
                    value={date}
                    mode={"date"}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                  />
                )}
                <Text style={globalStyles.inputLabel}>Contact Name:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Contact Name"
                  onChangeText={props.handleChange("contactName")}
                  value={props.values. }
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.contactName && props.errors.contactName}
                </Text>
                <Text style={globalStyles.inputLabel}>
                  Contact Email/Phone #:
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Contact Email/Phone #"
                  onChangeText={props.handleChange("contact")}
                  value={props.values.contact}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.contact && props.errors.contact}
                </Text>
                <Text style={globalStyles.inputLabel}># of Hours:</Text>

                <TextInput
                  style={globalStyles.input}
                  placeholder="# of Hours"
                  onChangeText={props.handleChange("hours")}
                  value={props.values.hours}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.hours && props.errors.hours}
                </Text>
                <Text style={globalStyles.inputLabel}>Comments:</Text>
                <TextInput
                  multiline
                  height={100}
                  style={globalStyles.input}
                  placeholder="Comment"
                  onChangeText={props.handleChange("comment")}
                  value={props.values.comment}
                />
                <Text style={globalStyles.inputLabel}>Attachments:</Text>
                <TouchableOpacity
                  style={styles.addAttachment}
                  onPress={() => {
                    DocumentPicker.getDocumentAsync().then(res => {
                      if (res.type !== "cancel")
                        FileSystem.readAsStringAsync(res.uri, {
                          encoding: FileSystem.EncodingType.Base64
                        }).then(base64 => {
                          if (attachments.length === 0) {
                            setAttachments([
                              ...attachments,
                              { name: res.name, data: base64 }
                            ]);
                          } else {
                            const toast = Toast.show(
                              "You can only have one attachment.",
                              {
                                position: 0,
                                mask: true,
                                imgSource: images.failed,
                                imgStyle: {
                                  width: 100,
                                  height: 100
                                }
                              }
                            );
                            setTimeout(() => Toast.hide(toast), 3000);
                          }
                        });
                    });
                  }}
                >
                  <MaterialIcons name="attach-file" size={28} />
                  <Text style={{ fontSize: 14 }}>Add Attachment</Text>
                </TouchableOpacity>
                <View style={styles.attachments}>
                  <FlatList
                    horizontal={true}
                    data={attachments}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        key={item.name}
                        style={{
                          flexDirection: "row",
                          marginLeft: 15,
                          alignItems: "center"
                        }}
                        onPress={() => {
                          deleteAttachment(item);
                        }}
                      >
                        <MaterialIcons name="delete" size={32} />
                        <Image
                          source={{ uri: "data:image/gif;base64," + item.data }}
                          style={{
                            width: 100,
                            height: 100,
                            marginHorizontal: 5
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <Button text="Submit" onPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 11,
    backgroundColor: "#fff"
  },
  date: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginVertical: 5
  },
  dateText: {
    fontSize: 18
  },
  datepicker: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 100
  },
  labelText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 28
  },
  addAttachment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5
  },
  attachments: {
    flex: 1,
    height: 100
  }
});
