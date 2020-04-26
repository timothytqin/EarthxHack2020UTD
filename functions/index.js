const functions = require("firebase-functions");

const app = require("express")();

const { db } = require("./util/admin");
const FBAuth = require("./util/fbAuth");
const { login, signup } = require("./handlers/auth");
const {
  updateProfile,
  getAuthenticatedUser,
  getUser
} = require("./handlers/users");
const {
  getOpenListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
} = require("./handlers/listing");
const {
  getRequests,
  createRequest,
  deleteRequest
} = require("./handlers/request");
const {
  createChatRoom,
  getChatMessages,
  createChatMessage,
  deleteChatMessage
} = require("./handlers/chat");

// Auth routes
app.post("/api/login", login);
app.post("/api/signup", signup);

// User routes
app.get("/api/user/:username", FBAuth, getUser);
app.get("/api/user", FBAuth, getAuthenticatedUser);
app.post("/api/user/:username", FBAuth, updateProfile);

// Listing routes
app.get("/api/listing", FBAuth, getOpenListings);
app.get("/api/listing/:listingId", FBAuth, getListing);
app.post("/api/listing", FBAuth, createListing);
app.post("/api/listing/:listingId", FBAuth, updateListing);
app.delete("/api/listing/:listingId", FBAuth, deleteListing);

// Request routes
app.get("/api/request", FBAuth, getRequests);
app.post("/api/request", FBAuth, createRequest);
app.delete("/api/request/:listingId", FBAuth, deleteRequest);

// Chat routes
app.get("/api/chat/:chatId", FBAuth, getChatMessages);
app.post("/api/chat", FBAuth, createChatRoom);
app.post("/api/chat/:chatId", FBAuth, createChatMessage);
app.delete("/api/chat/:chatId/:messageId", FBAuth, deleteChatMessage);

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
          recipient: doc.data().username,
          body: {
            listingId: snapshot.data().listingId
          },
          read: false
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
        body: {
          chatId: snapshot.data().chatId,
          message: snapshot.data().message
        },
        read: snapshot.data().read
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
