import React from "react";
import { StyleSheet, View, Image } from "react-native";

export default function ViewAttachment({ route, navigation }) {
  const { name, data } = route.params;

  // const header = name.length > 20 ? name.substring(0, 18) + "..." : name;
  navigation.setOptions({ headerTitle: name });

  return (
    <View style={styles.attachments}>
      <Image
        source={{ uri: "data:image/gif;base64," + data }}
        style={{ flex: 1 }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  attachments: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
