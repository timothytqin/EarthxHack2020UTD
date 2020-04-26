const { db } = require("../util/admin");

exports.getOpenListings = (req, res) => {
  db.collection("listings")
    .where("open", "==", true)
    .get()
    .then(data => {
      let openListings = [];
      data.forEach(doc => {
        openListings.push({
          ...doc.data(),
          listingId: doc.id
        });
      });
      return res.json(openListings);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
``;

exports.getListing = (req, res) => {
  let listingData = {};
  db.doc(`/listings/${req.params.listingId}`)
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "Listing not found" });
      if (doc.data().username !== req.user.username && !doc.data().open)
        return res.status(403).json({ error: "Unauthorized" });
      listingData = doc.data();
      listingData.listingId = doc.id;
      return db
        .collection("requests")
        .where("listingId", "==", req.params.listingId)
        .get();
    })
    .then(data => {
      listingData.requests = [];
      data.forEach(doc => {
        listingData.requests.push(doc.data());
      });
      return res.json(listingData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.createListing = (req, res) => {
  const newListing = {
    body: { ...req.body },
    username: req.user.username,
    userImage: req.user.imageUrl,
    location: req.user.location,
    createdAt: new Date().toISOString(),
    open: true
  };

  db.collection("listings")
    .add(newListing)
    .then(doc => {
      const listing = newListing;
      listing.listingId = doc.id;
      return res.status(201).json(listing);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "something went wrong" });
    });
};

exports.updateListing = (req, res) => {
  const document = db.doc(`/listings/${req.params.listingId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "Listing not found" });
      if (doc.data().username !== req.user.username) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      return document.update(req.body);
    })
    .then(() => {
      return res.json({ message: "Listing updated successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteListing = (req, res) => {
  const document = db.doc(`/listings/${req.params.listingId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "Listing not found" });
      if (doc.data().username !== req.user.username)
        return res.status(403).json({ error: "Unauthorized" });
      return document.delete();
    })
    .then(() => {
      return res.json({ message: "Listing deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
