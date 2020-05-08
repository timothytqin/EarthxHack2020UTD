import React from "react";
import {
  CardActionArea,
  CardContent,
  Typography,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";

const ChatroomCard = ({ details, title, chatId }) => {
  return (
    <div
      style={{
        marginBottom: "2rem",
        backgroundColor: "white",
        borderRadius: "1rem"
      }}
    >
      <Link
        to={`/chat/${chatId}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <CardActionArea>
          <CardContent>
            <div>
              {details.members[0] && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={details.members[0].imageUrl} alt="profile" />
                  <Avatar
                    src={details.members[1].imageUrl}
                    alt="profile"
                    style={{
                      position: "relative",
                      left: -20,
                      border: "#fff 2px solid"
                    }}
                  />
                  <Typography variant="h5" color="primary">
                    {details.members[0] &&
                      details.members[0].username +
                        ", " +
                        details.members[1].username}
                  </Typography>
                </div>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </div>
  );
};

export default ChatroomCard;
