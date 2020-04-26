import axios from 'axios';

export const createListing = (model) => {
    return axios.post('/api/listing', model);
};

export const updateListing = (listingId, model) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'FBIdToken'
    );
    return axios.post(`/api/listing/${listingId}`, model);
};
