import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardActionArea,
  CardContent,
  Typography,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => {
  return {
    root: {
      margin: "1.5rem"
    }
  };
});

const NotificationCard = ({ notification }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: ".5em"
      }}
    >
      <div style={{ maxWidth: "30rem", margin: "auto" }}>
        <Link
          to={`/listings/${notification.body.listingId}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <CardActionArea
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: "1rem"
            }}
          >
            <Avatar className={classes.root} src={notification.userImage} />
            <CardContent>
              <Typography variant="h5" color="primary">
                {notification.username} is interested in your listing
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </div>
    </div>
  );
};

export default NotificationCard;
