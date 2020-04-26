import { CREATE_LISTING } from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { storage } from "../firebase";

import { createListing as makeListing } from "../api/listing";

export const createListing = (newListing, image) => async dispatch => {
  dispatch(showLoading);
  var imgRef = storage.ref().child(image.name);
  await imgRef.put(image).then(snapshot => {
    console.log(snapshot);
  });
  newListing.body.listingImage = image.name;
  makeListing(newListing.body);
  console.log("new listing: ", newListing.body);
};
