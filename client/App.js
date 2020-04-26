import React, { useEffect, useState } from "react";
import { Platform, View, AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";

import Router from "./routes/Switch";

import store from "./redux/store";
import { setAuthenticated, setCredentials } from "./redux/actions/authActions";
import { getUserCredentials } from "./auth";
import { globalStyles } from "./styles/global";
import { constants } from "./shared/constants";

export const isAndroid = () => Platform.OS === "android";

export default function App() {
  useEffect(async () => {
    const dispatch = useDispatch();
    AsyncStorage.getItem(constants.asyncStorageKey).then(token => {
      if (token) {
        console.log("Token: " + token);
        getUserCredentials()
          .then(res => {
            console.log("User credentials: " + JSON.stringify(res.data));
            dispatch(setCredentials(res.data));
            dispatch(setAuthenticated(true));
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
