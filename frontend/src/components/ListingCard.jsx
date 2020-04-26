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

const ListingCard = ({ listing }) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.credentials.username);
  const reduxRequests = useSelector(state => state.user.requests);
  const [request, setRequest] = React.useState();

  React.useEffect(() => {
    setRequest(reduxRequests);
  }, [reduxRequests]);

  const handleRequest = () => {
    if (!request.includes(listing.listingId))
      createRequest(listing.listingId).then(res => {
        dispatch(addRequest(listing.listingId));
      });
    else {
      removeRequest(listing.listingId).then(() => {
        dispatch(deleteRequest(listing.listingId));
      });
    }
    console.log(listing);
  };

  return (
    <Card>
      <Link
        to={`/listings/${listing.listingId}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <CardActionArea>
          <CardMedia image={listing.body.listingImage} />
          <CardContent>
            <Typography variant="h5" color="primary">
              {listing.body.title}
            </Typography>
            <Typography variant="subtitle1">{listing.username}</Typography>
            <Typography variant="h6">
              {`${listing.body.distance} km`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        {request &&
          listing.username !== username &&
          (request.includes(listing.listingId) ? (
            <Button variant="contained" color="#ddd" onClick={handleRequest}>
              Cancel
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRequest}
            >
              Request
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};

export default ListingCard;
