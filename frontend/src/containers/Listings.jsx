import React from 'react';
import { useSelector } from 'react-redux';
import Filter from '../components/Filter';
import styles from '../css/listings.module.css';
import ListingCard from '../components/ListingCard';
import { getFilteredListings } from '../selectors';

const Products = (props) => {
    const listings = useSelector((state) => getFilteredListings(state));
    return (
        <div className={styles.bg}>
            <Filter />
            <main className={styles.grid}>
                {listings.map((item) => {
                    return <ListingCard listing={item} key={item.id} />;
                })}
            </main>
        </div>
    );
};

export default Products;
