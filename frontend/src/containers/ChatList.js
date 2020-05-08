import React, { useState, useEffect } from "react";
import { chatroomsdb } from "../firebase";
import { useSelector } from "react-redux";

import ChatroomCard from "../components/ChatroomCard";
import { Typography } from "@material-ui/core";

export default function ChatFeed() {
  const username = useSelector(state => state.user.credentials.username);
  const [chatrooms, setChatrooms] = useState([]);
  useEffect(() => {
    if (username) {
      chatroomsdb.onSnapshot(querySnapshot => {
        querySnapshot.forEach(chatroom => {
          setChatrooms(chatrooms => {
            // prevent duplicates
            for (let cr of chatrooms) {
              if (cr.id === chatroom.id) {
                return chatrooms;
              }
            }
            const result = [...chatrooms];
            const newChatroom = { ...chatroom.data(), id: chatroom.id };
            if (
              newChatroom.members[0].username === username ||
              newChatroom.members[1].username === username
            )
              result.push(newChatroom);
            return result;
          });
        });
      });
    }
  }, [username]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "30rem",
        margin: "auto",
        marginTop: "2rem"
      }}
    >
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginBottom: ".5em" }}
      >
        Chatrooms
      </Typography>
      {chatrooms.length === 0 && (
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginTop: "1em" }}
        >
          You have no chats. Go to another user's profile in order to chat with
          them.
        </Typography>
      )}
      {chatrooms.map(chatroom => {
        return (
          <ChatroomCard
            details={chatroom}
            title={`Chat between ${chatroom.members[0].username} and ${chatroom.members[1].username}`}
            chatId={chatroom.id}
            key={chatroom.id}
          />
        );
      })}
    </div>
  );
}
