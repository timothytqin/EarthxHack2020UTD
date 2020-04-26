import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../../redux/store";
import { globalStyles } from "../../styles/global";
import { constants } from "../../shared/constants";
import Collapsible from "../../components/Collapsible";

export default function Members({ navigation, route }) {
  const [members, setMembers] = useState(store.getState().reducer.members);

  store.subscribe(() => {
    setMembers(store.getState().reducer.members);
  });

  navigation.setOptions({
    headerTitle: "Members",
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
    <ScrollView style={globalStyles.container}>
      <Collapsible header="Officers">
        {members === null ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#666" />
            <Text>Loading officers...</Text>
          </View>
        ) : (
          <FlatList
            data={members.filter(member => member.position === 1)}
            renderItem={({ item }) => (
              <ListItem
                // key={item._id}
                title={item.name}
                chevron={{ color: "#666" }}
                rightElement={
                  <View>
                    <MaterialIcons
                      name="error-outline"
                      size={32}
                      color={"#f00"}
                    />
                  </View>
                }
                onPress={() => navigation.navigate("MemberDetail", item)}
                bottomDivider
              />
            )}
          />
        )}
      </Collapsible>
      <Collapsible header="Members">
        {members === null ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#666" />
            <Text>Loading members...</Text>
          </View>
        ) : (
          <FlatList
            data={members.filter(member => member.position === 0)}
            renderItem={({ item }) => (
              <ListItem
                // key={item._id}
                title={item.name}
                chevron={{ color: "#666" }}
                rightElement={
                  (!item.studentID || !item.email || !item.phoneNumber) && (
                    <View>
                      <MaterialIcons
                        name="error-outline"
                        size={32}
                        color={"#f00"}
                      />
                    </View>
                  )
                }
                onPress={() => navigation.navigate("MemberDetail", item)}
                bottomDivider
              />
            )}
          />
        )}
      </Collapsible>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  emptyText: {
    fontWeight: "bold",
    color: "#666",
    fontSize: 16,
    textAlign: "center"
  },
  loading: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
