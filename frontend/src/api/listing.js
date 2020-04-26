import axios from "axios";

export const createListing = model => {
  return axios.post("/listing", model);
};
