import { RECEIVE_CREDENTIALS } from '../actions/types';
import { combineReducers } from 'redux';

const credentials = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CREDENTIALS:
            return action.payload.credentials;
        default:
            return state;
    }
};

const listings = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CREDENTIALS:
            return action.payload.listings;
        default:
            return state;
    }
};

const notifications = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CREDENTIALS:
            return action.payload.notifications;
        default:
            return state;
    }
};

export default combineReducers({
    credentials,
    listings,
    notifications,
});
