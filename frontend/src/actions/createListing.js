import { CREATE_LISTING } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const createListing = (newListing) => async (dispatch) => {
    console.log('new listing: ', newListing.body);
};
