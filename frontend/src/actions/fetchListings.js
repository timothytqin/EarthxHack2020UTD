import axios from "axios";
import { RECEIVE_LISTINGS } from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const receiveListings = data => {
  return {
    type: RECEIVE_LISTINGS,
    payload: data
  };
};
export const fetchListings = () => async dispatch => {
  dispatch(showLoading());

  // liquors.get().then(async (snapshot) => {
  //     var listings = {};
  //     for (let doc of snapshot.docs) {
  //         const data = doc.data();
  //         const url = await storage.refFromURL(data.img).getDownloadURL();
  //         listings.push({ id: doc.id, ...data, img: url });
  //     }
  //     dispatch(receiveListings(listings));
  //     dispatch(hideLoading());
  // });

  let listings = [
    {
      id: 0,
      type: "laptop",
      manufacturer: "Apple",
      model: "Macbook Pro 2019 16 inch",
      img:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1529520060550"
    },
    {
      id: 1,
      type: "laptop",
      manufacturer: "Dell",
      model: "XPS 2019 13 inch",
      img:
        "https://images-na.ssl-images-amazon.com/images/I/71jxN6pEeNL._AC_SL1496_.jpg"
    },
    {
      id: 2,
      type: "tablet",
      manufacturer: "Apple",
      model: "iPad Air 2",
      img:
        "https://ss7.vzw.com/is/image/VerizonWireless/apple-ipadair2-spacegrey?$device-lg$&wid=256&hei=520"
    },
    {
      id: 3,
      type: "textbook",
      title: "Computer Systems A Programmer's Perspective",
      course: "CS429",
      img: "https://farm4.staticflickr.com/3435/3836184258_3d0418a2c0_b.jpg"
    }
  ];

  const token = localStorage.getItem("FBIdToken");
  axios.defaults.headers.common["Authorization"] = token;
  axios.get("/listing").then(res => {
    // console.log(JSON.stringify(res.data, null, 2));
    dispatch(receiveListings(res.data));
  }); // TODO
  dispatch(hideLoading());
};
