import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import store from "../../redux/store";
import { globalStyles, images } from "../../styles/global";
import Card from "../../components/Card";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  // const [reminders, setReminders] = useState(
  //   store.getState().reducer.reminders
  // );

  // const [events, setEvents] = useState(store.getState().reducer.events);
  // const [position, setPosition] = useState(
  //   store.getState().reducer.profile.position
  // );
  // const [authenticated, setAuthenticated] = useState(
  //   store.getState().reducer.authenticated
  // );

  const authenticated = useSelector(state => state.auth.authenticated);

  navigation.setOptions({
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
    <View style={globalStyles.container}>
      <Text>UTD</Text>
      <View style={styles.headerImage}>
        {/* <Image
          style={styles.logo}
          source={{
            uri: images.pwsh
          }}
          resizeMode="stretch"
        /> */}
      </View>
      <View style={{ flex: 6 }}>
        {/* <ScrollView>
          <Card
            title="Reminders"
            // background={images.reminder}
            edit={
              position > 0 ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Reminders", reminders)}
                >
                  <MaterialIcons name="edit" size={28} />
                </TouchableOpacity>
              ) : (
                <View />
              )
            }
          >
            {reminders !== null && reminders.length !== 0 ? (
              <FlatList
                data={reminders}
                renderItem={({ item }) => (
                  <ListItem
                    key={item._id}
                    title={item.reminder}
                    containerStyle={{ backgroundColor: "transparent" }}
                    leftIcon={<MaterialIcons name="brightness-1" size={12} />}
                  />
                )}
              />
            ) : reminders !== null ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  You have not created any reminders.
                </Text>
              </View>
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#666" />
                <Text>Loading reminders...</Text>
              </View>
            )}
          </Card>
          <Card
            title="Upcoming Events"
            // background={images.calendar}
            edit={
              position > 0 ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Events", events)}
                >
                  <MaterialIcons name="edit" size={28} />
                </TouchableOpacity>
              ) : (
                <View />
              )
            }
          >
            {events !== null && events.length !== 0 ? (
              <FlatList
                data={events.sort(
                  (a, b) => parseInt(a.eventDate) - parseInt(b.eventDate)
                )}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EventDetail", item)}
                  >
                    <ListItem
                      key={item._id}
                      title={item.eventName}
                      chevron={{ color: "#666" }}
                      containerStyle={{
                        backgroundColor: "#fff"
                      }}
                      rightElement={
                        <Text>
                          {new Date(
                            parseInt(item.eventDate)
                          ).toLocaleDateString()}
                        </Text>
                      }
                    />
                  </TouchableOpacity>
                )}
              />
            ) : events !== null ? (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  You have not created any events.
                </Text>
              </View>
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#666" />
                <Text>Loading events...</Text>
              </View>
            )}
          </Card>
        </ScrollView> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    flex: 1
  },
  logo: {
    // height: Image.resolveAssetSource(images.logo).height / 7
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
  }
});
