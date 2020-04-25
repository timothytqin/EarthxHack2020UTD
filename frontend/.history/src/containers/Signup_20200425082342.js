import React, { Component, useState } from "react";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";

// Redux stuff

export default function Signup(props) {
  const classes = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPassword] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email,
      password
    };
    console.log("SUBMITTING: " + JSON.stringify(userData));
  };
  return (
    <Grid container style={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2" style={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
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
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}
