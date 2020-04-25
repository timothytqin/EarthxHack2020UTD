import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatList() {
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
        axios.get("/user").then(res => {
          setUserCredentials(res.data);
          console.log(JSON.stringify(res.data, null, 2));
        });
      })
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      {/* {userCredentials &&
        userCredentials.chatrooms.map(room =>
          room.members[0] === userCredentials.credential.username
            ? room.members[1]
            : room.members[0]
        )} */}
    </div>
  );
}
