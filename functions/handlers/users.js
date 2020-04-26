const { db } = require("../util/admin");

exports.updateProfile = (req, res) => {
  let userDetails = req.body;

  db.doc(`/users/${req.params.username}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Profile updated successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.user.username}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("listings")
          .where("username", "==", req.user.username)
          .get();
      }
    })
    .then(data => {
      userData.listings = [];
      data.forEach(doc => {
        const listing = doc.data();
        listing.listingId = doc.id;
        listing.requests = [];
        db.collection("requests")
          .where("listingId", "==", listing.listingId)
          .get()
          .then(reqs => {
            reqs.forEach(req => {
              const request = req.data();
              request.requestId = req.id;
              listing.requests.push(request);
            });
          });
        userData.listings.push(listing);
      });
      return db
        .collection(`chatrooms`)
        .where("members", "array-contains", req.user.username)
        .get();
    })
    .then(data => {
      userData.chatrooms = [];
      data.forEach(doc => {
        const chatRoom = doc.data();
        chatRoom.chatroomId = doc.id;
        userData.chatrooms.push(chatRoom);
      });
      return db
        .collection(`notifications`)
        .where("recipient", "==", req.user.username)
        .limit(10)
        .get();
    })
    .then(data => {
      userData.notifications = [];
      data.forEach(doc => {
        userData.notifications.push({
          ...doc.data(),
          notificationId: doc.id
        });
      });
      return db
        .collection("requests")
        .where("username", "==", req.user.username)
        .get();
    })
    .then(data => {
      userData.requests = [];
      data.forEach(doc => {
        userData.requests.push(doc.data().listingId);
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
