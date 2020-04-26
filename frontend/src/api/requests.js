import axios from "axios";

export const createRequest = listingId => {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "FBIdToken"
  );
  return axios.post("/request", { listingId });
};

export const removeRequest = listingId => {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "FBIdToken"
  );
  return axios.delete(`/request/${listingId}`);
};
