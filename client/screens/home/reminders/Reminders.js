import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";

import store from "../../../redux/store";
import {
  addReminder,
  deleteReminder,
  loadReminders
} from "../../../redux/actions/authActions";
import { globalStyles, images } from "../../../styles/global";

import Button from "../../../components/Button";
import { constants } from "../../../shared/constants";
import { httpPostOptions } from "../../../shared/http";

export default function Reminders({ navigation, route }) {
  const [reminders, setReminders] = useState(
    store.getState().reducer.reminders
  );

  store.subscribe(() => {
    setReminders(store.getState().reducer.reminders);
  });

  const addReminderButton = (
    <TouchableOpacity
      style={globalStyles.add}
      onPress={() => {
        navigation.navigate("EditReminder");
      }}
    >
      <MaterialIcons name="add" size={28} color={"#666"} />
    </TouchableOpacity>
  );

  const removeReminder = _id => {
    fetch(
      constants.server.ngrok + constants.urls.deleteReminder + "/" + _id,
      httpPostOptions({})
    ).then(res => {
      store.dispatch(deleteReminder(_id));
    });
  };

  const updateAllReminders = () => {
    fetch(
      constants.server.ngrok + constants.urls.updateAllReminders,
      httpPostOptions(reminders)
    ).then(res => {
      // console.log("Updating all reminders");
      store.dispatch(loadReminders(reminders));
      navigation.navigate("Home");
    });
  };

  navigation.setOptions({
    headerTitle: "Active Reminders",
    headerRight: () => addReminderButton
  });

  return (
    <View style={globalStyles.container}>
      <View style={styles.reminders}>
        {reminders !== null && reminders.length !== 0 ? (
          <DraggableFlatList
            data={reminders}
            renderItem={({ item, index, drag, isActive }) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  style={styles.reminder}
                  onPress={() => {
                    navigation.navigate("EditReminder", item);
                  }}
                  onLongPress={drag}
                >
                  <MaterialIcons
                    style={styles.icon}
                    name="delete"
                    size={28}
                    onPress={() => removeReminder(item._id)}
                  />
                  <MaterialIcons style={styles.icon} name="menu" size={28} />
                  <Text style={styles.reminderText}>{item.reminder}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item._id}
            onDragEnd={({ data }) => {
              setReminders(data);
            }}
          />
        ) : reminders !== null ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              You have not set any reminders.
            </Text>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#666" />
            <Text>Loading reminders...</Text>
          </View>
        )}
      </View>
      <Button text="Save" onPress={updateAllReminders} />
    </View>
  );
}

const styles = StyleSheet.create({
  reminder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5
  },
  icon: {
    paddingHorizontal: 2
  },
  reminders: {
    flex: 1
  },
  reminderText: {
    fontWeight: "bold"
  },
  empty: {
    flex: 1,
    justifyContent: "center"
  },
  emptyText: {
    fontWeight: "bold",
    color: "#666",
    fontSize: 28,
    textAlign: "center"
  },
  loading: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  editForm: {
    flex: 1,
    justifyContent: "center"
  },
  editFormText: {
    fontWeight: "bold",
    marginLeft: 15
  }
});
