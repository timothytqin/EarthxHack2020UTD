import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import MultiSelect from "react-native-multiple-select";

import store from "../../store";
import { deleteHours } from "../../redux/actions";
import { globalStyles } from "../../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import { constants } from "../../shared/constants";
import { httpPostOptions } from "../../shared/http";

export default function Hours({ navigation }) {
  const [filters, setFilters] = useState(
    store.getState().reducer.profile.position > 0
      ? ["new"]
      : ["accepted", "new", "rejected"]
  );
  const [position, setPosition] = useState(
    store.getState().reducer.profile.position
  );
  const [hours, setHours] = useState(store.getState().reducer.hours);

  const deleteHour = _id => {
    fetch(
      constants.server.ngrok + constants.urls.deleteHours + "/" + _id,
      httpPostOptions({})
    ).then(res => {
      store.dispatch(deleteHours(_id));
    });
  };

  store.subscribe(() => {
    setHours(store.getState().reducer.hours);
    setPosition(store.getState().reducer.profile.position);
  });

  const addButton = (
    <TouchableOpacity
      style={globalStyles.add}
      onPress={() => navigation.navigate("AddHours")}
    >
      <MaterialIcons name="add" size={28} color={"#666"} />
    </TouchableOpacity>
  );

  const leftElement = item => {
    return !position ? (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <MaterialIcons
          name="delete"
          size={28}
          style={{ paddingRight: 5 }}
          onPress={() => deleteHour(item._id)}
        />
        <MaterialIcons
          name="edit"
          size={28}
          style={{ paddingLeft: 5 }}
          onPress={() => navigation.navigate("AddHours", item)}
        />
      </View>
    ) : (
      <View />
    );
  };

  navigation.setOptions({
    headerTitle: "Hours",
    headerLeft: () => (
      <TouchableOpacity
        style={globalStyles.menu}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={32} />
      </TouchableOpacity>
    ),
    headerRight: () => (!position ? addButton : <View />)
  });

  return (
    <View style={globalStyles.container}>
      <View style={styles.filter}>
        <Text style={styles.filterText}>Filters:</Text>
        <MultiSelect
          hideTags
          items={[
            { id: "accepted", name: "Accepted" },
            { id: "new", name: "New" },
            { id: "rejected", name: "Rejected" }
          ]}
          uniqueKey="id"
          onSelectedItemsChange={filters => {
            // console.log("Filters: " + JSON.stringify(filters));
            setFilters(filters);
          }}
          selectedItems={filters}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          selectedItemTextColor="#000"
          selectedItemIconColor="#0f0"
          itemTextColor="#666"
          displayKey="name"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
      </View>
      <View style={styles.hoursList}>
        {hours !== null && hours.length !== 0 ? (
          <FlatList
            data={hours
              .filter(
                hour =>
                  filters &&
                  ((hour.valid && filters.includes("accepted")) ||
                    (!hour.valid &&
                      !hour.validatedBy &&
                      filters.includes("new")) ||
                    (!hour.valid &&
                      hour.validatedBy &&
                      filters.includes("rejected")))
              )
              .map(hour => {
                hour.bgc = hour.valid
                  ? "#9f9"
                  : !hour.validatedBy
                  ? "#eee"
                  : "#f99";
                return hour;
              })}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => {
                  navigation.navigate("Detail", item);
                }}
              >
                <ListItem
                  key={item._id}
                  containerStyle={{
                    backgroundColor: item.bgc
                  }}
                  // leftAvatar={{ source: { uri: images.logo } }}
                  title={item.eventName}
                  chevron={{ color: "#666" }}
                  rightElement={
                    <View>
                      <Text style={styles.text}>{item.hours}</Text>
                    </View>
                  }
                  leftElement={() => leftElement(item)}
                  bottomDivider
                />
              </TouchableOpacity>
            )}
          />
        ) : hours !== null ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Either you have not submitted hours or none of your hours match
              the criteria.
            </Text>
          </View>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#666" />
            <Text>Loading hours...</Text>
          </View>
        )}
      </View>
      {/* <View style={styles.total}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 120,
    width: 340
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
  text: {
    fontSize: 18
  },
  modal: {
    flex: 1
  },
  form: {
    flex: 6
  },
  hoursList: {
    flex: 11
  },
  total: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 32
  },
  loading: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  filterText: {
    fontWeight: "bold",
    marginVertical: 5
  }
});
