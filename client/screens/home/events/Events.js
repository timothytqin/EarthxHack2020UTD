import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../../../redux/store";
import { addEvent, deleteEvent, loadEvents } from "../../../redux/actions/authActions";
import { globalStyles, images } from "../../../styles/global";

import Button from "../../../components/Button";
import { constants } from "../../../shared/constants";
import { httpPostOptions } from "../../../shared/http";

export default function Events({ navigation, route }) {
  const [events, setEvents] = useState(store.getState().reducer.events);

  store.subscribe(() => {
    setEvents(store.getState().reducer.events);
  });

  const removeEvent = _id => {
    fetch(
      constants.server.ngrok + constants.urls.deleteEvent + "/" + _id,
      httpPostOptions({})
    ).then(res => {
      store.dispatch(deleteEvent(_id));
    });
  };

  navigation.setOptions({
    headerTitle: "Active Events",
    headerRight: () => (
      <TouchableOpacity
        style={globalStyles.add}
        onPress={() => {
          navigation.navigate("EditEvents");
        }}
      >
        <MaterialIcons name="add" size={28} color={"#666"} />
      </TouchableOpacity>
    )
  });

  return (
    <View style={globalStyles.container}>
      <View style={styles.events}>
        {events !== null && events.length !== 0 ? (
          <FlatList
            data={events.sort(
              (a, b) => parseInt(a.eventDate) - parseInt(b.eventDate)
            )}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => {
                    navigation.navigate("EditEvents", item);
                  }}
                >
                  <ListItem
                    key={item._id}
                    title={item.eventName}
                    chevron={{ color: "#666" }}
                    rightElement={
                      <View>
                        <Text style={styles.text}>
                          {new Date(
                            parseInt(item.eventDate)
                          ).toLocaleDateString()}
                        </Text>
                      </View>
                    }
                    leftElement={() => (
                      <MaterialIcons
                        style={styles.icon}
                        name="delete"
                        size={28}
                        onPress={() => removeEvent(item._id)}
                      />
                    )}
                    bottomDivider
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : events !== null ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              You do not have any active events.
            </Text>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#666" />
            <Text>Loading events...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 2
  },
  events: {
    flex: 1
  },
  eventText: {
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
