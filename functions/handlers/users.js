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
