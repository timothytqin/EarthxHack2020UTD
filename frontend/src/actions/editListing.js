import { EDIT_LISTING } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const editListing = (newListing) => async (dispatch) => {
    dispatch(showLoading());
    console.log(newListing.body);
    dispatch(hideLoading());
};
