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
import { useSelector, useDispatch } from "react-redux";

import { createRequest, removeRequest } from "../api/requests";
import { addRequest, deleteRequest } from "../actions/editRequests";

const Profile = () => {
  const user = useSelector(state => state.user.credentials);
  return (
    <Card>
      <CardActionArea>
        <CardMedia image={user.imageUrl} />
        <CardContent>
          <Typography variant="h5" color="primary">
            {user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Profile;
