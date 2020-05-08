import { SET_AUTHENTICATED, SET_CREDENTIALS } from "../actions/types";

const INITIAL_STATE = {
  authenticated: false,
  credentials: null
};

export default authReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: payload };
    case SET_CREDENTIALS:
      return { ...state, credentials: payload };
    default:
      return state;
  }
};
