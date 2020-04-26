import React, { useState, useEffect } from 'react';
import { chatroomsdb } from '../firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function ChatList() {
    const username = useSelector((state) => state.user.credentials.username);
    const [chatrooms, setChatrooms] = useState([]);
    useEffect(() => {
        if (username) {
            let getMyChatrooms = chatroomsdb.where(
                'members',
                'array-contains',
                username
            );
            getMyChatrooms.onSnapshot((querySnapshot) => {
                querySnapshot.forEach((chatroom) => {
                    setChatrooms((chatrooms) => {
                        // prevent duplicates
                        for (let cr of chatrooms) {
                            if (cr.id === chatroom.id) {
                                return chatrooms;
                            }
                        }
                        return [
                            ...chatrooms,
                            { ...chatroom.data(), id: chatroom.id },
                        ];
                    });
                });
            });
        }
    }, [username]);

    return <div></div>;
}
