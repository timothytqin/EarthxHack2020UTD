import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = props => {
  return (
    <Grid container>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h2">Login</Typography>
        <form noValidate>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={this.state.email}
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <br />
          <small>
            dont have an account ? sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Login;
