import { showLoading, hideLoading } from "react-redux-loading-bar";
import { storage } from "../firebase";

import { createListing as makeListing } from "../api/listing";

export const createListing = (newListing, image) => async dispatch => {
  dispatch(showLoading());
  var imgRef = storage.ref().child(image.name);
  await imgRef.put(image);
  newListing.body.listingImage = image.name;
  makeListing(newListing.body);
  dispatch(hideLoading());
};
