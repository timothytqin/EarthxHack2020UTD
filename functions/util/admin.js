const admin = require("firebase-admin");
const serviceKey = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
  databaseURL: "https://utdloanthrone.firebaseio.com"
});

const db = admin.firestore();

module.exports = { admin, db };
