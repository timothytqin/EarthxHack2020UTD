import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  ShadowPropTypesIOS
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "@unimodules/core";
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

export default function EventDetail({ navigation, route }) {
  const { eventName, eventDate, description, attachments } = route.params;
  navigation.setOptions({
    headerTitle: eventName
  });

  return (
    <View style={styles.form}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={globalStyles.inputLabel}>Event Name: </Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Event Name"
          value={eventName}
          editable={false}
        />
        <Text style={globalStyles.inputLabel}>Description:</Text>
        <TextInput
          multiline
          height={100}
          style={globalStyles.input}
          placeholder="Description"
          value={description}
          editable={false}
        />
        <View style={styles.date}>
          <MaterialIcons name="insert-invitation" size={32} color={"#666"} />
          <Text style={styles.dateText}>
            {new Date(parseInt(eventDate)).toDateString()}
          </Text>
        </View>
        <Text style={globalStyles.inputLabel}>Attachments:</Text>
        <View style={styles.attachments}>
          <FlatList
            horizontal={true}
            data={attachments}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => navigation.navigate("ViewAttachment", item)}
                style={{
                  flexDirection: "row"
                }}
              >
                <Image
                  source={{ uri: "data:image/gif;base64," + item.data }}
                  style={{ width: 100, height: 100, marginHorizontal: 5 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
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
