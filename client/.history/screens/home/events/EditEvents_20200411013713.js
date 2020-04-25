import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  ShadowPropTypesIOS
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Formik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-tiny-toast";

import store from "../../../store";
import { addEvent, updateEvent } from "../../../redux/actions";
import { globalStyles, images } from "../../../styles/global";

import Popup from "../../../components/Popup";
import Button from "../../../components/Button";
import { constants } from "../../../shared/constants";
import { httpPostOptions } from "../../../shared/http";

const EventSchema = Yup.object({
  eventName: Yup.string().required()
});

export default function EditEvents({ navigation, route }) {
  const edit = !!route.params;

  const [attachments, setAttachments] = useState(
    route.params && route.params.attachments ? route.params.attachments : []
  );

  const [date, setDate] = useState(
    edit ? new Date(parseInt(route.params.eventDate)) : new Date()
  );

  const [datepickerOpen, setDatepickerOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatepickerOpen(Platform.OS === "ios");
    // currentDate
    setDate(currentDate);
  };

  const deleteAttachment = attachment => {
    setAttachments(attachments.filter(item => item.name !== attachment.name));
  };

  const saveEvent = event => {
    // console.log("Event model: " + JSON.stringify(event));
    fetch(
      constants.server.ngrok +
        (edit
          ? constants.urls.updateEvent + "/" + event._id
          : constants.urls.addEvent),
      httpPostOptions(event)
    )
      .then(res => res.json())
      .then(res => {
        if (!edit) store.dispatch(addEvent(res));
        else store.dispatch(updateEvent(res));
      });
  };

  navigation.setOptions({
    headerTitle: (edit ? "Edit" : "Add") + " Event"
  });

  return (
    <KeyboardAvoidingView
      style={{ ...globalStyles.container }}
      behavior={Platform.Os == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          <Formik
            initialValues={
              edit
                ? route.params
                : {
                    eventName: "",
                    eventDate: date,
                    description: ""
                  }
            }
            validationSchema={EventSchema}
            onSubmit={(values, actions) => {
              values.creatorID = store.getState().reducer.profile._id;
              const newDate = new Date(date.getTime());
              newDate.setHours(1, 0, 0, 0);
              values.eventDate = newDate.getTime();
              values.attachments = attachments;
              saveEvent(values);
              actions.resetForm();
              navigation.navigate("Events");
            }}
          >
            {props => (
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={globalStyles.inputLabel}>Event Name: </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Event Name"
                  onChangeText={props.handleChange("eventName")}
                  value={props.values.eventName}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.eventName && props.errors.eventName}
                </Text>
                <Text style={globalStyles.inputLabel}>Description:</Text>
                <TextInput
                  multiline
                  height={100}
                  style={globalStyles.input}
                  placeholder="Description"
                  onChangeText={props.handleChange("description")}
                  value={props.values.description}
                />
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
                      <Text style={styles.labelText}>Date of Event</Text>
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
                <Button text="save" onPress={props.handleSubmit} />
              </View>
            )}
          </Formik>
        </View>
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
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5
  },
  attachments: {
    flex: 1
  }
});
