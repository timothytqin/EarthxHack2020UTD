import {
  RECEIVE_CREDENTIALS,
  ADD_REQUEST,
  DELETE_REQUEST
} from "../actions/types";
import { combineReducers } from "redux";

const credentials = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CREDENTIALS:
      return { ...state, ...action.payload.credentials };
    default:
      return state;
  }
};

const listings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CREDENTIALS:
      return action.payload.listings;
    default:
      return state;
  }
};

const notifications = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CREDENTIALS:
      return action.payload.notifications;
    default:
      return state;
  }
};

const requests = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CREDENTIALS:
      return action.payload.requests;
    case ADD_REQUEST:
      return [...state, action.payload];
    case DELETE_REQUEST:
      return state.filter(item => item !== action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  credentials,
  listings,
  notifications,
  requests
});
