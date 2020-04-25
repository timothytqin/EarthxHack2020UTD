import React from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import products from "../css/products.module.css";
import ProductCard from "../components/ListingCard";
import { getFilteredListings } from "../selectors";

const Login = props => {
  const liquors = useSelector(state => getFilteredListings(state));
  return (
    
  );
};

export default Login;
