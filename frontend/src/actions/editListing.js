import { showLoading, hideLoading } from "react-redux-loading-bar";

import { updateListing } from "../api/listing";

export const editListing = newListing => async dispatch => {
  dispatch(showLoading());
  delete newListing.body.listingImage;
  delete newListing.body.distance;
  updateListing(newListing.listingId, newListing.body);
  dispatch(hideLoading());
};
