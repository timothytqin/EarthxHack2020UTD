import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

import store from "../../store";
import { globalStyles } from "../../styles/global";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";
import { updateMember } from "../../actions";
import Button from "../../components/Button";
import Toast from "react-native-tiny-toast";

export default function MemberDetail({ navigation, route }) {
  const profile = route.params;
  const [position, setPosition] = useState(profile.position);

  const save = () => {
    fetch(
      constants.server.ngrok + constants.urls.updateUser + "/" + profile._id,
      httpPostOptions({ position: position })
    )
      .then(res => res.json())
      .then(res => {
        res._id = profile._id;
        store.dispatch(updateMember(res));
      })
      .then(() => {
        Toast.showSuccess(profile.name + "'s position has been updated.");
      })
      .then(() => navigation.navigate("Member"));
  };

  navigation.setOptions({ headerTitle: profile.name });

  return (
    <View style={globalStyles.container}>
      <View style={styles.form}>
        <View style={{ alignItems: "center" }}>
          <Image style={styles.pfp} source={{ uri: profile.thumbnail }} />
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={globalStyles.inputLabel}>Student ID:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Student ID"
            value={profile.studentID}
            editable={false}
          />
          <Text style={globalStyles.inputLabel}>Personal Email:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Personal Email"
            value={profile.email}
            editable={false}
          />
          <Text style={globalStyles.inputLabel}>Phone #:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Phone #"
            value={profile.phoneNumber}
            editable={false}
          />
          <Text style={globalStyles.inputLabel}>Position: </Text>
          <TouchableOpacity
            style={{ marginVertical: 5, marginLeft: 15, width: 100 }}
          >
            <RNPickerSelect
              disabled={store.getState().reducer.profile.position <= 1}
              value={position}
              Icon={() => (
                <MaterialIcons
                  style={styles.caret}
                  name="arrow-drop-down"
                  size={20}
                />
              )}
              onValueChange={value => {
                setPosition(value);
              }}
              items={[
                { label: "Member", value: 0 },
                { label: "Officer", value: 1 }
                // { label: "Sponsor", value: 2 }
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {store.getState().reducer.profile.position > 1 && (
        <Button
          text="Save"
          // buttonStyle={styles.save}
          onPress={save}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1
  },
  pfp: {
    width: 100,
    height: 100,
    marginVertical: 10
  }
});
