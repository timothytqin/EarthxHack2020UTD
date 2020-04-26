import React, { useState, useEffect } from "react";
import { chatroomsdb } from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";

import ChatroomCard from "../components/ChatroomCard";
import { Grid } from "@material-ui/core";

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
            return [...chatrooms, { ...chatroom.data(), id: chatroom.id }];
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
      {chatrooms.map(chatroom => {
        console.log("CHATROOM: " + JSON.stringify(chatroom));
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
