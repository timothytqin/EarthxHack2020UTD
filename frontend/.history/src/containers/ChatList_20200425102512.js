import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatList() {
  const [userCredentials, setuserCredentials] = useState([]);
  useEffect(() => {
    const userData = {
      email: "timothy.t.qin@gmail.com",
      password: "tq05112001"
    };
    axios
      .post("/login", userData)
      .then(res => {
        const token = `Bearer ${res.data.token}`;
        localStorage.setItem("FBIdToken", token);
        axios.defaults.headers.common["Authorization"] = token;
      })
      .then(() => {
        axios.get("/user").then(res => {
          console.log(JSON.stringify(res.data, null, 2));
        });
      })
      .catch(err => console.error(err));
  }, []);
  return <div>{chatList.map()}</div>;
}
