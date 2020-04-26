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
  CardActions,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";

const NotificationCard = ({ notification }) => {
  return (
    <Grid container>
      <Grid item sm={3} />
      <Grid item sm={6} xs={12}>
        <Card>
          <Link
            to={`/listings/${notification.body.listingId}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <CardActionArea style={{ flexDirection: "row" }}>
              <CardMedia image={notification.userImage} />
              <CardContent>
                <Typography variant="h5" color="primary">
                  {notification.username} is interested in your listing
                </Typography>
              </CardContent>
            </CardActionArea>
          </Link>
        </Card>
      </Grid>
      <Grid item sm={3} />
    </Grid>
  );
};

export default NotificationCard;
