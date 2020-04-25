import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { globalStyles, images } from "../../styles/global";
export default function FAQDetail({ navigation, route }) {
  navigation.setOptions({ headerTitle: route.params.headerTitle });
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={route.params.data}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
              {/* <Image
                source={images.paw}
                style={{
                  marginTop: 5,
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  flex: 1
                }}
              /> */}
              <View style={styles.text}>
                <Text style={styles.question}>{item.question}</Text>
                <Text>{item.answer}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 5
  },
  question: {
    fontWeight: "bold",
    paddingVertical: 10
  }
});
