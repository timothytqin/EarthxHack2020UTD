import axios from "axios";

export const createListing = model => {
  return axios.post("/listing", model);
};

export const updateListing = (listingId, model) => {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "FBIdToken"
  );
  return axios.post(`/listing/${listingId}`, model);
};
