import { AsyncStorage } from "react-native";
import axios from "axios";

import { constants } from "./shared/constants";

export const login = model => {
  return axios
    .post(
      "https://us-central1-utdloanthrone.cloudfunctions.net/api/login",
      model
    )
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      AsyncStorage.setItem(constants.asyncStorageKey, token);
      axios.defaults.headers.common["Authorization"] = token;
    })
    .catch(err => {
      console.error(err);
    });
};

export const getUserCredentials = () => {
  return axios.get(
    "https://us-central1-utdloanthrone.cloudfunctions.net/api/user",
    model
  );
};

export const logout = () => {
  AsyncStorage.removeItem(constants.asyncStorageKey);
  axios.defaults.headers.common["Authorization"] = "";
};
