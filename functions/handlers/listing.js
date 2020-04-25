const { db } = require("../util/admin");

exports.createListing = (req, res) => {
  const newListing = {
    ...req.body,
    username: req.user.username,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString()
  };

  db.collection("listings")
    .add(newListing)
    .then(doc => {
      const listing = newListing;
      listing.listingId = doc.id;
      return res.json(listing);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "something went wrong" });
    });
};

exports.createListing = (req, res) => {
  const newListing = {
    ...req.body,
    username: req.user.username,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString()
  };

  db.collection("listings")
    .add(newListing)
    .then(doc => {
      const listing = newListing;
      listing.listingId = doc.id;
      return res.json(listing);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "something went wrong" });
    });
};