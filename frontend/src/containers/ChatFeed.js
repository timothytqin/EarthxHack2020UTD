import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { messagesdb } from '../firebase';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';

export default function ChatList(props) {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (chatId) {
            let getChatMessages = messagesdb.where('chatId', '==', chatId);
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
    }, [chatId]);

    return (
        <div>
            {messages.map((message) => {
                return <Card>message</Card>;
            })}
        </div>
    );
}
