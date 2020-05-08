import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Avatar
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
            <Typography variant="h5" color="primary" noWrap="true">
              {listing.body.title}
            </Typography>
            <Link to={`/u/${listing.username}`} style={{ display: "flex" }}>
              <Avatar
                src={listing.userImage}
                alt="profile"
                style={{ width: "1em", height: "1em", marginRight: ".2em" }}
              />
              <Typography variant="subtitle1">{listing.username}</Typography>
            </Link>
            {listing.body &&
              listing.body.distance &&
              listing.body.distance >= 0 && (
                <Typography variant="h6">
                  {`${listing.body.distance} mi`}
                </Typography>
              )}
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        {request &&
          listing.username !== username &&
          (request.includes(listing.listingId) ? (
            <Button variant="contained" onClick={handleRequest}>
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
