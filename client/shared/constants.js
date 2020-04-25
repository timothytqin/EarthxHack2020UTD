export const constants = {
  server: {
    localhost: "http://localhost:3000",
    ngrok: "http://f13ce067.ngrok.io"
  },
  urls: {
    user: "/u",
    updateUser: "/u/update",
    login: "/u/login",
    hours: "/h",
    addHours: "/h/create",
    updateHours: "/h/update",
    deleteHours: "/h/delete",
    reminder: "/r",
    addReminder: "/r/create",
    updateReminder: "/r/update",
    deleteReminder: "/r/delete",
    updateAllReminders: "/r/update/all",
    event: "/e",
    addEvent: "/e/create",
    updateEvent: "/e/update",
    deleteEvent: "/e/delete"
  },
  oauthConfigIOS: {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email"],
    clientId:
      "91300696783-t564su32lskshofbs30fdd5iin5ci0nb.apps.googleusercontent.com"
  },
  oauthConfigAndroid: {
    issuer: "https://accounts.google.com",
    scopes: ["openid", "profile", "email"],
    // keytool -exportcert -alias nhsandroiddebugkey -keystore ~/.android/debug.keystore -v
    clientId:
      "91300696783-ifk5tha03na2nv6fcs9m960o78b1hmh9.apps.googleusercontent.com"
  },
  asyncStorageKey: "utdhack"
};
