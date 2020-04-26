import axios from "axios";

export const sendMessage = (message, chatId) => {
  return axios.post(`/chat/${chatId}`, { message });
};
