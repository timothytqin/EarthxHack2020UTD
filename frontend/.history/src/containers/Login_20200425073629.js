import React from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";
import products from "../css/products.module.css";
import ProductCard from "../components/ListingCard";
import { getFilteredListings } from "../selectors";

const Login = props => {
  const liquors = useSelector(state => getFilteredListings(state));
  return (
    <div className={products.bg}>
      <Filter />
      <main className={products.grid}>
        {liquors.map(item => {
          return <ProductCard product={item} key={item.id} />;
        })}
      </main>
    </div>
  );
};

export default Login;
