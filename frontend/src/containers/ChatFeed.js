import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { messagesdb } from '../firebase';
import { useSelector } from 'react-redux';
import { Card, Grid, Button, TextField } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

import { sendMessage } from '../api/chat';

export default function ChatFeed(props) {
    const classes = useTheme();
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState();
    const username = useSelector((state) => state.user.credentials.username);
    useEffect(() => {
        if (id) {
            let getChatMessages = messagesdb.where('chatId', '==', id);
            getChatMessages.onSnapshot((querySnapshot) => {
                console.log(querySnapshot);
                querySnapshot.forEach((message) => {
                    setMessages((messages) => {
                        // prevent duplicates
                        for (let m of messages) {
                            if (m.id === message.id) {
                                return messages;
                            }
                        }
                        return [
                            ...messages,
                            { ...message.data(), id: message.id },
                        ];
                    });
                });
            });
        }
    }, [id]);

    const submitMessage = (message) => {
        sendMessage(message, id).then(() => setText(''));
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '2rem',
                maxWidth: '30rem',
                margin: 'auto',
                marginTop: '5rem',
            }}
        >
            {messages.map((message) => {
                return (
                    <p
                        style={{
                            textAlign:
                                message.sender === username ? 'right' : 'left',
                        }}
                    >
                        {message.message}
                    </p>
                );
            })}
            <Grid item container direction="row">
                <TextField
                    id="message"
                    name="message"
                    type="text"
                    label="Type message here..."
                    style={classes.textField}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => submitMessage(text)}
                >
                    <SendIcon />
                </Button>
            </Grid>
        </div>
    );
}
