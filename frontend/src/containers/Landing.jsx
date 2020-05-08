import React from "react";
import "../css/landing.css";
import Video from "../css/assets/demo.mp4";

const Landing = props => {
  return (
    <main className="bg">
      <video style={{ width: "40vw" }} controls>
        <source src={Video} type="video/mp4" />
      </video>
      <div style={{ display: "flex", flexDirection: "column", margin: "5em" }}>
        <h2>Demo Credentials:</h2>
        <div>
          <strong>Email: </strong>
          temoc@utd.edu
          <br />
          <strong>Password: </strong>
          temoc1
          <br />
        </div>
        <br />
        <div>
          <strong>Email: </strong>
          bevo@utexas.edu
          <br />
          <strong>Password: </strong>
          bevoxv
          <br />
        </div>
        <br />
        <div>
          <strong>Email: </strong>
          reveille@tamu.edu
          <br />
          <strong>Password: </strong>
          reveille
          <br />
        </div>
      </div>
    </main>
  );
};

export default Landing;
