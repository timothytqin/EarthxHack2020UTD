const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/fbAuth");
const { login, signup } = require("./handlers/auth");
const { updateProfile } = require("./handlers/users");
const { createListing } = require("./handlers/listing");

// Auth routes
app.post("/login", login);
app.post("/signup", signup);

// User routes
app.post("/user/:username", FBAuth, updateProfile);

// Listing routes
app.post("/listing", FBAuth, createListing);

exports.api = functions.https.onRequest(app);
