const functions = require("firebase-functions");

const app = require("express")();

const { db } = require("./util/admin");
const FBAuth = require("./util/fbAuth");
const { login, signup } = require("./handlers/auth");
const { updateProfile } = require("./handlers/users");
const {
  getOpenListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
} = require("./handlers/listing");
const { createRequest, deleteRequest } = require("./handlers/request");
const {
  createChatRoom,
  createChatMessage,
  deleteChatMessage
} = require("./handlers/chat");

// Auth routes
app.post("/login", login);
app.post("/signup", signup);

// User routes
app.post("/user/:username", FBAuth, updateProfile);

// Listing routes
app.get("/listing", FBAuth, getOpenListings);
app.get("/listing/:listingId", FBAuth, getListing);
app.post("/listing", FBAuth, createListing);
app.post("/listing/:listingId", FBAuth, updateListing);
app.delete("/listing/:listingId", FBAuth, deleteListing);

// Request routes
app.post("/request", FBAuth, createRequest);
app.delete("/request/:requestId", FBAuth, deleteRequest);

// Chat routes
app.post("/chat", FBAuth, createChatRoom);
app.post("/chat/:chatId", FBAuth, createChatMessage);
app.delete("/chat/:chatId/:messageId", FBAuth, deleteChatMessage);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnCreateRequest = functions.firestore
  .document("requests/{requestId}")
  .onCreate(snapshot => {
    return db
      .doc(`/listings/${snapshot.data().listingId}`)
      .get()
      .then(doc => {
        return db.doc(`/notifications/${snapshot.id}`).set({
          type: "request",
          createdAt: snapshot.data().createdAt,
          username: snapshot.data().username,
          userImage: snapshot.data().userImage,
          listingId: snapshot.data().listingId,
          recipient: doc.data().username
        });
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.deleteNotificationOnDeleteRequest = functions.firestore
  .document("requests/{requestId}")
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
      });
  });

exports.createNotificationOnCreateChatMessage = functions.firestore
  .document("messages/{messageId}")
  .onCreate(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .set({
        type: "chat",
        createdAt: snapshot.data().createdAt,
        sender: snapshot.data().sender,
        senderImage: snapshot.data().senderImage,
        chatId: snapshot.data().chatId,
        message: snapshot.data().message
      })
      .catch(err => {
        console.error(err);
      });
  });

exports.deleteNotificationOnDeleteChatMessage = functions.firestore
  .document("messages/{messageId}")
  .onDelete(snapshot => {
    return db
      .doc(`/notifications/${snapshot.id}`)
      .delete()
      .catch(err => {
        console.error(err);
      });
  });

exports.deleteAllOnDeleteListing = functions.firestore
  .document("listings/{listingId}")
  .onDelete((snapshot, context) => {
    const listingId = context.params.listingId;
    const batch = db.batch();
    return db
      .collection("requests")
      .where("listingId", "==", listingId)
      .get()
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/requests/${doc.id}`));
        });
        return db
          .collection("notifications")
          .where("listingId", "==", listingId)
          .get();
      })
      .then(data => {
        data.forEach(doc => {
          batch.delete(db.doc(`/notifications/${doc.id}`));
        });
        return batch.commit();
      })
      .catch(err => {
        console.error(err);
      });
  });
