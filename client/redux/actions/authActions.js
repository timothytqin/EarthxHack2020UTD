import { SET_AUTHENTICATED, SET_CREDENTIALS } from "./types";

export const setAuthenticated = data => ({
  type: SET_AUTHENTICATED,
  payload: data
});

export const setCredentials = data => ({
  type: SET_CREDENTIALS,
  payload: data
});
