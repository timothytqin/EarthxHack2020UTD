import React, { useEffect, useState } from "react";
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
  Grid,
  Avatar
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import ListingCard from "../components/ListingCard";
import { storage } from "../firebase";

import { getUserProfile } from "../api/user";
import { createChatroom } from "../api/chat";

const Profile = props => {
  const myUsername = useSelector(state => state.user.credentials.username);
  const dispatch = useDispatch();
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [pfp, setPfp] = useState(null);
  useEffect(() => {
    let listings = [];
    dispatch(showLoading());
    getUserProfile(username)
      .then(async res => {
        setPfp(res.data.imageUrl);
        for (let listing of res.data.listings) {
          let listingData = { ...listing };
          listingData.body.listingImage = await storage
            .ref(listing.body.listingImage)
            .getDownloadURL();
          listings.push(listingData);
        }
      })
      .then(() => {
        setProfile(listings);
        dispatch(hideLoading());
      });
  }, [dispatch, username]);
  return (
    <>
      {profile && (
        <div
          style={{
            maxWidth: "20rem",
            margin: "auto",
            marginTop: "3rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={pfp}
              alt="profile"
              style={{
                marginRight: "1rem",
                width: "50px",
                height: "50px"
              }}
            />
            <Typography variant="h3" color="primary">
              {username}
            </Typography>
          </div>
          {username !== myUsername && (
            <Button
              variant="contained"
              color="secondary"
              style={{
                margin: "1em 2.5em",
                position: "fixed",
                bottom: 10,
                right: 0,
                zIndex: 1000
              }}
              onClick={() =>
                createChatroom({ username, imageUrl: pfp }).then(res => {
                  props.history.push(`/chat/${res.chatId}`);
                })
              }
            >
              <ChatIcon style={{ margin: ".1em" }} />
              Chat
            </Button>
          )}
          <Typography variant="subtitle1" style={{ marginTop: "1rem" }}>
            Listings:
          </Typography>
          <CardContent>
            {profile.map(listing => {
              return (
                <div key={listing.id} style={{ marginBottom: "1rem" }}>
                  <ListingCard listing={listing} />
                </div>
              );
            })}
          </CardContent>
        </div>
      )}
    </>
  );
};

export default Profile;
