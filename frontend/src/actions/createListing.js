import { CREATE_LISTING } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { storage } from '../firebase';

export const createListing = (newListing, image) => async (dispatch) => {
    dispatch(showLoading);
    var imgRef = storage.ref().child(image.name);
    await imgRef.put(image).then((snapshot) => {
        console.log(snapshot);
    });
    newListing.body.listingImage = image.name;

    console.log('new listing: ', newListing.body);
};
