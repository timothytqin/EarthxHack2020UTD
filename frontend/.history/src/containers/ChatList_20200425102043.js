import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatList() {
    const [chatList, setChatList] = useState([]);
    useEffect(() => {
        const userData = {
            email,
            password,
        };
        axios
            .post('/api/login', userData)
            .then((res) => {
                const token = `Bearer ${res.data.token}`;
                localStorage.setItem('FBIdToken', token);
                axios.defaults.headers.common['Authorization'] = token;
                props.history.push('/chat');
            })
            .then(() => {
                axios.get('/user').then((res) => {
                    console.log(JSON.stringify(res.data, null, 2));
                });
            })
            .catch((err) => setErrors(err));
    }, []);
    return <div>{JSON.stringify(chatList)}</div>;
}
