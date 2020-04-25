// import { liquors, storage } from '../firebase';
import { RECEIVE_LISTINGS } from './types';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const receiveListings = (data, ids) => {
    return {
        type: RECEIVE_LISTINGS,
        payload: data,
        ids: ids,
    };
};
export const fetchListings = () => async (dispatch) => {
    dispatch(showLoading());
    // liquors.get().then(async (snapshot) => {
    //     var listings = {};
    //     for (let doc of snapshot.docs) {
    //         const data = doc.data();
    //         const url = await storage.refFromURL(data.img).getDownloadURL();
    //         listings.push({ id: doc.id, ...data, img: url });
    //     }
    //     dispatch(receiveListings(listings));
    //     dispatch(hideLoading());
    // });
};
