import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { messagesdb } from "../firebase";
import { useSelector } from "react-redux";

export default function ChatList({ chatId }) {
  const username = useSelector(state => state.user.credentials.username);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (username) {
      let getChatMessages = messagesdb.where("chatId", "==", chatId);
      getChatMessages.onSnapshot(querySnapshot => {
        querySnapshot.forEach(message => {
          setMessages(messages => {
            // prevent duplicates
            for (let m of messages) {
              if (m.id === message.id) {
                return messages;
              }
            }
            return [...messages, { ...message.data(), id: message.id }];
          });
        });
      });
    }
  }, [username]);

  return <div></div>;
}
