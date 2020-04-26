import axios from 'axios';

export const getUserProfile = (username) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'FBIdToken'
    );
    return axios.get(`/api/user/${username}`);
};
