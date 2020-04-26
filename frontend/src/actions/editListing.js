import { EDIT_LISTING } from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import { updateListing } from "../api/listing";

export const editListing = newListing => async dispatch => {
  dispatch(showLoading());
  updateListing(newListing.listingId, newListing);
  console.log(newListing);
  dispatch(hideLoading());
};
