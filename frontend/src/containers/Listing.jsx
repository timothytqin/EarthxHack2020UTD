import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getListing } from "../selectors";
import product from "../css/product.module.css";
import { Card, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "var(--bg-gradient)",
    padding: "1rem",
    gridArea: "img",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: "100%",
    background: "var(--gold-gradient)",
    color: "var(--bg-color)",
    fontWeight: "700",
    marginTop: "1rem"
  }
});
const Listing = props => {
  const { id } = useParams();
  const [listing, setListing] = React.useState(
    useSelector(state => getListing(state, id))
  );
  console.log(listing);
  const classes = useStyles();

  return (
    <>
      {listing && (
        <div className={product.bg}>
          <Card className={classes.root}>
            <img
              className={product.img}
              src={listing.listingImage}
              alt={`product id: ${id}`}
            />
          </Card>
          <div className={product.title_container}></div>
          <div className={product.action_container}>
            <span className={product.price}>{listing.title}</span>
            <Button className={classes.button}>Request</Button>
          </div>
          <div className={product.details_container}>
            {listing.type && (
              <div className={product.details_row}>
                <div className={product.details_label}>type</div>
                <div className={product.details_text}>{listing.type}</div>
              </div>
            )}
            {listing.body &&
              Object.keys(listing.body).map(key => {
                return (
                  <div className={product.details_row}>
                    <div className={product.details_label}>{key}</div>
                    <div className={product.details_text}>
                      {listing.body[key]}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default Listing;
