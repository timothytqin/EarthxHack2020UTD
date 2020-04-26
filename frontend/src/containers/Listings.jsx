import React from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import Filter from '../components/Filter';
import styles from '../css/listings.module.css';
import ListingCard from '../components/ListingCard';
import { getFilteredListings } from '../selectors';
import { Button } from '@material-ui/core';

const Listings = (props) => {
    const listings = useSelector((state) => getFilteredListings(state));
    return (
        <div className={styles.bg}>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{
                        margin: '1em 2.5em',
                        position: 'fixed',
                        bottom: 10,
                        right: 0,
                        zIndex: 1000,
                    }}
                    href="/listings/create"
                >
                    Add Listing
                    <AddIcon />
                </Button>
                <Filter />
            </div>
            <main className={styles.grid}>
                {listings.map((item) => {
                    console.log(item);
                    return <ListingCard listing={item} key={item.listingId} />;
                })}
            </main>
        </div>
    );
};

export default Listings;
