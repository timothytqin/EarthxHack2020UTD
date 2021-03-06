const { db } = require("../util/admin");

exports.getRequests = (req, res) => {
  db.collection("requests")
    .where("username", "==", req.user.username)
    .get()
    .then(doc => {
      if (doc.size === 0)
        return res.status(404).json({ error: "Requests not found" });
      let requests = [];
      doc.forEach(doc => {
        requests.push(doc.data());
      });
      return res.json(requests);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

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
  db.collection("requests")
    .where("username", "==", req.user.username)
    .where("listingId", "==", req.params.listingId)
    .limit(1)
    .get()
    .then(data => {
      if (data.size === 0)
        return res.status(404).json({ error: "Request not found" });
      let requestId;
      data.forEach(doc => {
        requestId = doc.id;
      });
      return db.doc(`/requests/${requestId}`).delete();
    })
    .then(() => {
      return res.json({ message: "Request deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
