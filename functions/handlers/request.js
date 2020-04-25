const { db } = require("../util/admin");

exports.createRequest = (req, res) => {
  const newRequest = {
    listingId: req.body.listingId,
    username: req.user.username,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    accepted: false
  };
  db.doc(`/listings/${newRequest.listingId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "Listing not found" });
      if (doc.data().username === req.user.username)
        return res.status(403).json({ error: "Cannot request own listing" });
      return db.collection("requests");
    })
    .then(data => {
      return data
        .where("username", "==", req.user.username)
        .where("listingId", "==", newRequest.listingId)
        .get()
        .then(doc => {
          if (doc.size !== 0)
            return res.status(400).json({ error: "Request exists" });
          return data.add(newRequest);
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ message: "Something went wrong" });
        });
    })
    .then(doc => {
      const request = newRequest;
      request.requestId = doc.id;
      return res.json(request);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    });
};

exports.deleteRequest = (req, res) => {
  const document = db.doc(`/requests/${req.params.requestId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "Request not found" });
      if (doc.data().username !== req.user.username)
        return res.status(403).json({ error: "Unauthorized" });
      return document.delete();
    })
    .then(() => {
      return res.json({ message: "Request deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
