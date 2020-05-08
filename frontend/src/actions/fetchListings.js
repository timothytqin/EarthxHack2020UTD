import axios from "axios";
import { RECEIVE_LISTINGS } from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { storage } from "../firebase";

const receiveListings = data => {
  return {
    type: RECEIVE_LISTINGS,
    payload: data
  };
};
export const fetchListings = () => async (dispatch, getState) => {
  dispatch(showLoading());
  const token = localStorage.getItem("FBIdToken");
  axios.defaults.headers.common["Authorization"] = token;
  axios.get("/api/listing").then(async res => {
    const listings = [];
    for (let listing of res.data) {
      let distance = Math.random() * 100;
      listing.body.distance = distance.toFixed(0);
      const url = await storage.ref(listing.body.listingImage).getDownloadURL();
      listing.body.listingImage = url;
      listings.push(listing);
    }
    dispatch(
      receiveListings(
        listings.sort((a, b) => a.body.distance - b.body.distance)
      )
    );
  }); // TODO
  dispatch(hideLoading());
};
