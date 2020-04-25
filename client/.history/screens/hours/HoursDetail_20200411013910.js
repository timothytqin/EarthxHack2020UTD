import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../../store";
import { updateHours } from "../../redux/actions";
import { constants } from "../../shared/constants";
import { globalStyles, images } from "../../styles/global";
import { httpPostOptions } from "../../shared/http";
import Button from "../../components/Button";

export default function Detail({ route, navigation }) {
  const {
    _id,
    bgc,
    eventName,
    hours,
    contactName,
    contact,
    date,
    volunteer,
    volunteerName,
    valid,
    validatorName,
    validatedBy,
    validatedTime,
    comment,
    attachments
  } = route.params;
  const [position, setPosition] = useState(
    store.getState().reducer.profile.position
  );

  store.subscribe(() => {
    setPosition(store.getState().reducer.profile.position);
  });

  navigation.setOptions({ headerTitle: "Event Details" });

  const validate = valid => {
    const updatedModel = {
      _id: _id,
      valid: valid,
      validatedBy: store.getState().reducer.profile._id,
      validatorName: store.getState().reducer.profile.name,
      validatedTime: "" + new Date().getTime()
    };
    // console.log("Validation model: " + JSON.stringify(updatedModel));
    fetch(
      constants.server.ngrok + constants.urls.updateHours + "/" + _id,
      httpPostOptions(updatedModel)
    )
      .then(res => res.json())
      .then(res => store.dispatch(updateHours(res)))
      .then(navigation.navigate("Hours"));
  };

  const verification = valid ? (
    <View>
      <Text style={styles.verificationText}>
        Verified and accepted by {validatorName} at
      </Text>
      <Text style={styles.verificationText}>
        {new Date(parseInt(validatedTime)).toString()}
      </Text>
    </View>
  ) : !validatedBy ? (
    <Text style={styles.verificationText}>
      Your hours are in review. Please wait patiently.
    </Text>
  ) : (
    <View>
      <Text style={styles.verificationText}>
        Verified and rejected by {validatorName} at
      </Text>
      <Text style={styles.verificationText}>
        {new Date(parseInt(validatedTime)).toString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.form}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {position > 0 ? (
          <View>
            <Text style={globalStyles.inputLabel}>Volunteer Name:</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Volunteer Name"
              value={volunteerName}
              editable={false}
            />
          </View>
        ) : (
          <View />
        )}
        <Text style={globalStyles.inputLabel}>Event Name:</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Event Name"
          value={eventName}
          editable={false}
        />
        <Text style={globalStyles.inputLabel}>Event Date:</Text>
        <View style={styles.date}>
          <MaterialIcons name="insert-invitation" size={32} color={"#666"} />
          <Text style={styles.dateText}>
            {new Date(parseInt(date)).toDateString()}
          </Text>
        </View>
        <Text style={globalStyles.inputLabel}>Contact Name:</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Contact Name"
          value={contactName}
          editable={false}
        />
        <Text style={globalStyles.inputLabel}>Contact Email/Phone #:</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Contact Email/Phone #"
          value={contact}
          editable={false}
        />
        <Text style={globalStyles.inputLabel}># of Hours:</Text>

        <TextInput
          style={globalStyles.input}
          placeholder="# of Hours"
          value={hours}
          editable={false}
        />
        <Text style={globalStyles.inputLabel}>Comments:</Text>
        <TextInput
          multiline
          height={100}
          style={globalStyles.input}
          placeholder="Comment"
          value={comment}
          editable={false}
        />
        <View style={styles.attachments}>
          <Text style={globalStyles.inputLabel}>Attachments:</Text>
          <FlatList
            horizontal={true}
            data={attachments}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => navigation.navigate("ViewAttachment", item)}
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
      {position > 0 && (
        <View style={styles.validation}>
          <Button
            text="Accept"
            buttonStyle={{ backgroundColor: "#0f0" }}
            onPress={() => validate(true)}
          />
          <Button
            text="Reject"
            buttonStyle={{ backgroundColor: "#f00" }}
            onPress={() => validate(false)}
          />
        </View>
      )}
      <View style={{ ...styles.verificationStatus, backgroundColor: bgc }}>
        {verification}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
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
  detailText: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10
  },
  validation: {
    flexDirection: "row",
    justifyContent: "center"
  },
  verificationText: {
    fontWeight: "bold",
    textAlign: "center"
  },
  verificationStatus: {
    alignItems: "center",
    textAlign: "center"
  },
  attachments: {
    flex: 1,
    marginTop: 15
  }
});
