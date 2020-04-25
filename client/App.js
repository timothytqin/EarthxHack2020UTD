import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Router from "./routes/Switch";

import store from "./store";
import { getCachedAuthAsync, login, getGoogleProfile } from "./auth";
import { globalStyles } from "./styles/global";

export const isAndroid = () => Platform.OS === "android";

export default function App() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !store.getState().reducer.authenticated) {
        if (cachedAuth.accessToken) {
          const googleProfile = await getGoogleProfile(cachedAuth.accessToken);
          await login({
            email: googleProfile.email,
            password: googleProfile.password
          });
        } else {
          login(cachedAuth);
        }
      }
      setDone(true);
    })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
}
