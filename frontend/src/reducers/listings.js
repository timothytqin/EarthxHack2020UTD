import { RECEIVE_LISTINGS } from "../actions/types";

const listings = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return [...action.payload];
    default:
      return state;
  }
};

export default listings;
