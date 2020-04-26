import { RECEIVE_CREDENTIALS } from './types';

export const receiveCredentials = (data) => {
    return {
        type: RECEIVE_CREDENTIALS,
        payload: data,
    };
};
