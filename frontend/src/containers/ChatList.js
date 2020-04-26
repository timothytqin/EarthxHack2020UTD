import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ChatList() {
  const [loading, setLoading] = useState(true);
  const [userCredentials, setUserCredentials] = useState({});
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
