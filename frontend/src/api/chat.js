import axios from 'axios';

export const sendMessage = (message, chatId) => {
    return axios.post(`/api/chat/${chatId}`, { message });
};
