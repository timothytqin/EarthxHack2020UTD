const { db } = require("../util/admin");

const { reduceUserDetails } = require("../util/validators");

exports.updateProfile = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

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
        userData.listings.push(doc.data());
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
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
