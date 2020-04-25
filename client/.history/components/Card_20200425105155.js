import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

export default function Card(props) {
  return (
    <View style={styles.card}>
      {/* <ImageBackground
        source={props.background}
        style={styles.background}
        imageStyle={{ resizeMode: "stretch", borderRadius: 5, opacity: 0.4 }}
      > */}
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{props.title}</Text>
          </View>
          <View style={styles.edit}>{props.edit}</View>
        </View>
        <View style={styles.cardContent}>{props.children}</View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    elevation: 10,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 8
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    flex: 1
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 28,
    marginVertical: 10,
    marginHorizontal: 18
  },
  edit: {
    marginHorizontal: 10
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 10
  },
  background: {
    flex: 1
  }
});
