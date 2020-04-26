import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import listings from './listings';
import filters from './filters';
import user from './user';

export default combineReducers({
    listings,
    loadingBar: loadingBarReducer,
    filters,
    user,
});
