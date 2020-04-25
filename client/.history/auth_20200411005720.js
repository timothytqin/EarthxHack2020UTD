import * as AppAuth from "expo-app-auth";
import { Platform, AsyncStorage, Alert } from "react-native";

import store from "./store";
import { INITIAL_STATE } from "./reducer";
import {
  authenticate,
  loadProfile,
  loadHours,
  logout,
  loadReminders,
  loadEvents,
  loadMembers
} from "./actions";
import { constants } from "./shared/constants";
import { httpPostOptions, httpGetOptions } from "./shared/http";

const isAndroid = () => Platform.OS === "android";

export const login = model => {
  fetch(constants.server.ngrok + constants.urls.login, httpPostOptions(model))
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        store.dispatch(authenticate(model));
        store.dispatch(loadProfile(res.user));
        cacheAuthAsync(constants.asyncStorageKey, model);
        fetchHours();
        fetchReminders();
        fetchEvents();
        fetchMembers();
      } else {
        Alert.alert("Please Sign in with a PISD email.");
      }
    });
  // .then(async () => {
  //   // console.log("Attempting to fetch hours...");
  //   await fetchHours();
  //   await fetchReminders();
  //   await fetchEvents();
  //   await fetchMembers();
  // });
};

export const fetchHours = () => {
  fetch(
    constants.server.ngrok +
      constants.urls.hours +
      "/" +
      store.getState().reducer.profile._id,
    httpGetOptions()
  )
    .then(res => res.json())
    .then(res => {
      store.dispatch(loadHours(res));
    });
};

export const fetchReminders = () => {
  fetch(
    constants.server.ngrok +
      constants.urls.reminder +
      "/" +
      store.getState().reducer.profile._id,
    httpGetOptions()
  )
    .then(res => res.json())
    .then(res => {
      store.dispatch(loadReminders(res));
    });
};

export const fetchEvents = () => {
  fetch(
    constants.server.ngrok +
      constants.urls.event +
      "/" +
      store.getState().reducer.profile._id,
    httpGetOptions()
  )
    .then(res => res.json())
    .then(res => {
      store.dispatch(loadEvents(res));
    });
};

export const fetchMembers = () => {
  fetch(constants.server.ngrok + constants.urls.user, httpGetOptions())
    .then(res => res.json())
    .then(res => {
      // console.log("Users: " + JSON.stringify(res));
      store.dispatch(loadMembers(res));
    });
};

// export const googleAuth = async () => {
//   store.dispatch(authenticate(authState));
// };

export const getGoogleProfile = async token => {
  if (!token) {
    authState = await googleSignInAsync();
    token = authState.accessToken;
  }
  const model = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + token
  )
    .then(res => res.json())
    .then(res => {
      return {
        email: res.email,
        password: res.sub,
        name: res.name,
        thumbnail: res.picture
      };
    });

  return model;
};

export async function googleSignInAsync() {
  let authState = await AppAuth.authAsync(
    isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS
  );
  // await cacheAuthAsync(constants.asyncStorageKey, authState);
  return authState;
}

export async function cacheAuthAsync(key, authState) {
  return await AsyncStorage.setItem(key, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(constants.asyncStorageKey);
  let authState = JSON.parse(value);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(
    isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS,
    refreshToken
  );
  // console.log("Refresh Auth: " + JSON.stringify(authState));
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  if (accessToken) {
    await AppAuth.revokeAsync(
      isAndroid ? constants.oauthConfigAndroid : constants.oauthConfigIOS,
      {
        token: accessToken,
        isClientIdProvided: true
      }
    );
  }
  await AsyncStorage.removeItem(constants.asyncStorageKey);
  await store.dispatch(loadProfile(INITIAL_STATE.profile));
  await store.dispatch(authenticate(null));
  await store.dispatch(logout());
  // console.log(
  //   "Logged out, the storage: " +
  //     JSON.stringify(AsyncStorage.getItem(constants.asyncStorageKey.auth))
  // );
}
