import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  withStyles,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from "@material-ui/core";
import { Link } from "react-router-dom";

const NotificationCard = ({ notification }) => {
  return (
    <Card>
      <Link
        to={`/app/${notification.body.listingId}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <CardActionArea>
          <CardMedia image={notification.userImage} />
          <CardContent>
            <Typography variant="h5" color="primary">
              {notification.username} is interested in your listing
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default NotificationCard;
