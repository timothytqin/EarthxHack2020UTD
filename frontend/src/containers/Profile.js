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
  Grid
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import ListingCard from "../components/ListingCard";
import { storage } from "../firebase";

import { getUserProfile } from "../api/user";

const Profile = () => {
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
  }, [username]);
  return (
    <>
      {profile && (
        <Card>
          <CardActionArea>
            <CardMedia image={pfp} />
            <CardContent>
              <Typography variant="h5" color="primary">
                {username}
              </Typography>
            </CardContent>
            <CardContent>
              {profile.map(listing => {
                return (
                  <Grid container>
                    <Grid item sm={4} xs={3} />
                    <Grid item sm={4} xs={6}>
                      <ListingCard listing={listing} />
                    </Grid>
                    <Grid item sm={4} xs={3} />
                  </Grid>
                );
              })}
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default Profile;
