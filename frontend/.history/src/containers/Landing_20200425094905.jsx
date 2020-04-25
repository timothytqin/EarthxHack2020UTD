import React from "react";
import "../css/landing.css";
import { Button, withStyles } from "@material-ui/core";

const Landing = props => {
  useEffect(() => {
    const authToken = localStorage.getItem("FBIdToken");
    if (authToken) console.log("Auth token in local storage");
    else console.log("No token stored, go log in");
  }, []);
  return (
    <main className="bg">
      <div className="center">Our landing page</div>
    </main>
  );
};

export default Landing;
