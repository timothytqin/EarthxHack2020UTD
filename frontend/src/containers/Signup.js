import React, { Component, useState } from "react";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";

import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import axios from "axios";
import { receiveCredentials } from "../actions/receiveCredentials";
import { signup, getCredentials } from "../api/auth";

// Redux stuff

export default function Signup(props) {
  const classes = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
      username,
      location
    };
    dispatch(showLoading());
    signup(userData).then(() => {
      getCredentials().then(res => {
        dispatch(receiveCredentials(res.data));
        dispatch(hideLoading());
        props.history.push("/listings");
      });
    });
  };
  return (
    <Grid container style={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" style={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit} style={{ padding: "1em" }}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            style={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            style={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            style={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
          />
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            style={classes.textField}
            helperText={errors.username}
            error={errors.username ? true : false}
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            id="location"
            name="location"
            type="text"
            label="Zip Code"
            style={classes.textField}
            helperText={errors.location}
            error={errors.location ? true : false}
            value={location}
            onChange={e => setLocation(e.target.value)}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" style={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={classes.button}
          >
            Signup
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}
