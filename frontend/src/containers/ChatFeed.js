import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { chatroomsdb, messagesdb } from "../firebase";
import { useSelector } from "react-redux";
import { Button, TextField, Typography, Avatar } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

import { sendMessage } from "../api/chat";

export default function ChatFeed(props) {
  const classes = useTheme();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState({});
  const [text, setText] = useState();
  const username = useSelector(state => state.user.credentials.username);
  useEffect(() => {
    if (id) {
      chatroomsdb
        .doc(`/${id}`)
        .get()
        .then(doc => {
          setChatDetails(doc.data().members);
        });
      let getChatMessages = messagesdb
        .where("chatId", "==", id)
        .orderBy("createdAt");
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
  }, [id]);

  const submitMessage = message => {
    sendMessage(message, id).then(() => setText(""));
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "2rem",
        maxWidth: "30rem",
        margin: "auto",
        marginTop: "3rem",
        height: "72vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        {chatDetails[0] && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={chatDetails[0].imageUrl} alt="profile" />
            <Avatar
              src={chatDetails[1].imageUrl}
              alt="profile"
              style={{
                position: "relative",
                left: -20,
                border: "#fff 2px solid",
                marginBottom: "5px"
              }}
            />
            <Typography variant="h5" color="primary">
              {chatDetails[0] &&
                chatDetails[0].username + ", " + chatDetails[1].username}
            </Typography>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "scroll"
        }}
      >
        <p style={{ textAlign: "center" }}>Start of conversation history</p>
        {messages.map(message => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent:
                  message.sender === username ? "flex-end" : "flex-start"
              }}
            >
              {message.sender !== username && (
                <Avatar
                  src={message.senderImage}
                  alt="profile"
                  style={{ width: "1em", height: "1em", marginRight: ".3em" }}
                />
              )}
              <p
                style={{
                  display: "flex",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  wordWrap: "break-word",
                  hyphens: "auto",
                  maxWidth: "inherit"
                }}
              >
                {message.message}
              </p>
              {message.sender === username && (
                <Avatar
                  src={message.senderImage}
                  alt="profile"
                  style={{ width: "1em", height: "1em", marginLeft: ".3em" }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="message"
          name="message"
          type="text"
          label="Type message here..."
          style={classes.textField}
          value={text}
          onChange={e => setText(e.target.value)}
          fullWidth
        />
        <Button
          style={{ margin: "1rem" }}
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => submitMessage(text)}
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
