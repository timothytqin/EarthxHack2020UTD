const config = require("./firebaseConfig");

const firebase = require("firebase");
firebase.initializeApp(config);

module.exports = firebase;
