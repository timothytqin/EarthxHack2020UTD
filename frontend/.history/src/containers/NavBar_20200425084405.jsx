import React from "react";
import LoadingBar from "react-redux-loading-bar";
import nav from "../css/navbar.module.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import { UTD_LOGO } from "../css/images";

const NavBar = props => {
  return (
    <div>
      <LoadingBar style={styles.loadingBar} />
      <AppBar style={{ flexDirection: "row" }}>
        <Link to="/liquors">
          <img src={UTD_LOGO} style={} alt="windsor liquors logo" />
          LIQUOR
        </Link>
        <IconButton aria-label="Shopping Cart" style={{ marginRight: ".4em" }}>
          <ShoppingCartIcon
            style={{
              fontSize: "1.5em",
              color: "#2a2d35"
            }}
          />
        </IconButton>
      </AppBar>
      <div style={{ height: "5em" }}></div>
    </div>
  );
};

const styles = {
  loadingBar: { backgroundColor: "#EDCE86", zIndex: "1200" },
  appBar: {
    flexDirection: "row"
  },
  logo: {
    width: "13em",
    marginleft: "1.5em"
  }
};

export default NavBar;
