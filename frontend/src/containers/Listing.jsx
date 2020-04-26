import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListing } from "../selectors";
import product from "../css/product.module.css";
import { editListing } from "../actions/editListing";
import { createListing } from "../actions/createListing";
import ImageUploader from "react-images-upload";
import {
  Card,
  Button,
  makeStyles,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";

import { createRequest, removeRequest } from "../api/requests";
import { addRequest, deleteRequest } from "../actions/editRequests";

const useStyles = makeStyles({
  root: {
    background: "var(--bg-gradient)",
    padding: "1rem",
    gridArea: "img",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  formControl: {
    minWidth: "200px",
    margin: "2rem"
  }
});

const laptopTabletTemplate = {
  title: "",
  model: "",
  manufacturer: "",
  listingImage: ""
};

const textbookTemplate = {
  title: "",
  course: "",
  edition: "",
  author: "",
  listingImage: ""
};

const Listing = props => {
  const { id } = useParams();
  const reduxListing = useSelector(state => getListing(state, id));
  const reduxRequests = useSelector(state => state.user.requests);
  // react state
  const [listing, setListing] = React.useState();
  const [mode, setMode] = React.useState("view");
  const [request, setRequest] = React.useState();

  const username = useSelector(state => state.user.credentials.username);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setListing(reduxListing);
  }, [reduxListing]);

  React.useEffect(() => {
    setRequest(reduxRequests);
  }, [reduxRequests]);

  React.useEffect(() => {
    if (id === "create") {
      setMode("create");
    } else if (listing && listing.username === username) {
      setMode("edit");
    }
  }, [id, listing, username]);
  // redux state
  console.log(username);

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
    console.log(listing);
  };
  const handleConfirmEdit = () => {
    if (mode === "create") {
      dispatch(createListing(listing, image));
    } else {
      dispatch(editListing(listing));
    }
    props.history.push("/listings");
  };
  const handleChangeText = (event, name) => {
    setListing(listing => {
      return {
        ...listing,
        body: {
          ...listing.body,
          [name]: event.target.value
        }
      };
    });
  };

  // only used for creating
  const [type, setType] = React.useState("");
  const handleChangeType = event => {
    setType(event.target.value);
    setListing(() => {
      return {
        body: {
          ...(event.target.value === "textbook"
            ? textbookTemplate
            : laptopTabletTemplate),
          type: event.target.value
        }
      };
    });
  };
  const [image, setImage] = React.useState();
  const handleAddImage = picture => {
    setImage(picture[0]);
  };

  const classes = useStyles();

  return (
    <>
      <div className={product.bg}>
        {mode === "create" && (
          <FormControl className={classes.formControl}>
            <InputLabel id="type-select">Type</InputLabel>
            <Select id="type-select" value={type} onChange={handleChangeType}>
              <MenuItem value="laptop">Laptop</MenuItem>
              <MenuItem value="tablet">Tablet</MenuItem>
              <MenuItem value="textbook">Textbook</MenuItem>
            </Select>
          </FormControl>
        )}
        {listing && listing.body.type && (
          <>
            {listing.body.listingImage ? (
              <Card className={classes.root}>
                <img
                  className={product.img}
                  src={listing.body.listingImage}
                  alt={`product id: ${id}`}
                />
              </Card>
            ) : (
              <ImageUploader
                singleImage
                onChange={handleAddImage}
                withPreview
              />
            )}
            <div className={product.title_container}>
              <Typography color="primary" variant="h4">
                {listing.body.title}
              </Typography>
            </div>
            {mode === "view" &&
              (request.includes(listing.listingId) ? (
                <div className={product.action_container}>
                  <Button
                    variant="contained"
                    color="#ddd"
                    onClick={handleRequest}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className={product.action_container}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleRequest}
                  >
                    Request
                  </Button>
                </div>
              ))}
            <div className={product.details_container}>
              {listing.body &&
                Object.keys(listing.body).map(key => {
                  if (
                    key === "type" ||
                    key === "listingImage" ||
                    key === "distance" ||
                    (mode === "view" && key === "title")
                  ) {
                    return null;
                  }
                  return (
                    <div className={product.details_row} key={key}>
                      <div className={product.details_label}>{key}</div>
                      <div className={product.details_text}>
                        <TextField
                          disabled={mode === "view"}
                          value={listing.body[key]}
                          onChange={event => handleChangeText(event, key)}
                          required
                        />
                      </div>
                    </div>
                  );
                })}
              {mode !== "view" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleConfirmEdit}
                >
                  Confirm
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Listing;
