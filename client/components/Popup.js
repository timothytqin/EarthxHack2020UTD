import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import store from "../redux/store";
import { globalStyles, images } from "../styles/global";
import { constants } from "../shared/constants";

export default function Popup({ children, visible, modalOpen }) {
  return (
    <Modal visible={visible}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={globalStyles.container}>
          <View style={styles.header}>
            <View style={{ flex: 10 }} />
            <View style={styles.close}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => modalOpen(false)}
              >
                <MaterialIcons name="close" size={32} color={"#666"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  body: { flex: 11 },
  close: {
    flex: 1
  },
  closeButton: {
    borderColor: "#666",
    borderRadius: 10,
    borderWidth: 1
  }
});
