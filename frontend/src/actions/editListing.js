import { EDIT_LISTING } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { updateListing } from '../api/listing';

export const editListing = (newListing) => async (dispatch) => {
    dispatch(showLoading());
    delete newListing.body.listingImage;
    delete newListing.distance;
    console.log(newListing);
    updateListing(newListing.listingId, newListing);
    dispatch(hideLoading());
};
