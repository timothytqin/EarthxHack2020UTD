import { ADD_REQUEST, DELETE_REQUEST } from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const addRequest = listingId => {
  return {
    type: ADD_REQUEST,
    payload: listingId
  };
};

export const deleteRequest = listingId => {
  return {
    type: DELETE_REQUEST,
    payload: listingId
  };
};