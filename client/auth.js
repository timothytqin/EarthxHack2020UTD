import { AsyncStorage } from "react-native";
import axios from "axios";

import { constants } from "./shared/constants";

export const login = model => {
  axios
    .post("/login", model)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      AsyncStorage.setItem(constants.asyncStorageKey, token);
      axios.defaults.headers.common["Authorization"] = token;
    })
    .catch(err => {
      console.error(err);
    });
};
