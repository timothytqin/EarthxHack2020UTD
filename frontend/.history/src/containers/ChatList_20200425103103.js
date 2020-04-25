import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatList() {
  const [loading, setLoading] = useState(true);
  const [userCredentials, setUserCredentials] = useState({});
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
        axios
          .get("/user")
          .then(res => {
            setUserCredentials(res.data);
            console.log(JSON.stringify(res.data, null, 2));
          })
          .then(() => setLoading(false));
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      {!loading &&
        userCredentials.chatrooms.map(room =>
          room.members[0] === userCredentials.credentials.username
            ? room.members[1]
            : room.members[0]
        )}
    </div>
  );
}
