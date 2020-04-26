import axios from "axios";

export const createRequest = listingId => {
  return axios.post("/request", { listingId });
};

export const deleteRequest = listingId => {
  return axios.delete(`/request/${listingId}`);
};
