import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { globalStyles, images } from "../../styles/global";

export default function Contact({ navigation }) {
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

  const remindCodes = [
    { _id: 0, key: "Senior A-F", value: "@westnhs01" },
    { _id: 1, key: "Senior G-L", value: "@westnhs02" },
    { _id: 2, key: "Senior M-R", value: "@westnhs03" },
    { _id: 3, key: "Senior S-Z", value: "@westnhs04" },
    { _id: 4, key: "Junior A-F", value: "@westnhs05" },
    { _id: 5, key: "Junior G-L", value: "@westnhs06" },
    { _id: 6, key: "Junior M-R", value: "@westnhs07" },
    { _id: 7, key: "Junior S-Z", value: "@westnhs08" }
  ];

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerText}>Connect with Plano West NHS</Text>
      <View style={styles.remind}>
        <View style={styles.center}>
          {/* <Image
            style={styles.logo}
            source={images.remind}
            resizeMode="contain"
          /> */}
        </View>
        <FlatList
          data={remindCodes}
          renderItem={({ item }) => {
            return (
              <ListItem
                key={item._id}
                title={item.key}
                rightElement={
                  <View>
                    <Text style={styles.text}>{item.value}</Text>
                  </View>
                }
                bottomDivider
              />
            );
          }}
        />
      </View>
      <View style={styles.gmail}>
        <View style={styles.center}>
          <Image
            style={styles.logo}
            source={images.gmail}
            resizeMode="contain"
          />
        </View>
        <View style={styles.gmailText}>
          <Text style={styles.boldedText}>
            Questions? Concerns? Suggestions?
          </Text>
          <Text>Shoot us a email at pwestnhs@gmail.com</Text>
          <Text>An Officer will get back to you shortly.</Text>
          <Text>To contact Ms. Robinson our sponsor...</Text>
          <Text>Please email: kristi.robinson@pisd.edu</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#00f",
    textAlign: "center",
    padding: 10
  },
  center: { alignItems: "center" },
  remind: {
    flex: 3,
    justifyContent: "center"
  },
  gmail: {
    flex: 1,
    justifyContent: "center"
  },
  gmailText: {
    alignItems: "center"
  },
  logo: {
    width: 80,
    height: 80
  },
  boldedText: {
    fontWeight: "bold"
  }
});
