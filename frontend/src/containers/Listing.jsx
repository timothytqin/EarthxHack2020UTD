import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getListing } from '../selectors';
import product from '../css/product.module.css';
import { Card, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        background: 'var(--bg-gradient)',
        padding: '1rem',
        gridArea: 'img',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        background: 'var(--gold-gradient)',
        color: 'var(--bg-color)',
        fontWeight: '700',
        marginTop: '1rem',
    },
});
const Listing = (props) => {
    const { id } = useParams();
    const [listing, setListing] = React.useState(
        useSelector((state) => getListing(state, id))
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
                            src={listing.img}
                            alt={`product id: ${id}`}
                        />
                    </Card>
                    <div className={product.title_container}>
                        <h1 className={product.name}>
                            {listing.type === 'wine' &&
                                `${listing.winery} ${listing.varietal}, ${listing.vintage}`}
                            {listing.type === 'beer' && `${listing.producer}`}
                        </h1>

                        <span className={product.size}>
                            {listing.size + 'ml, ' + listing.pack + ' pack'}
                        </span>
                    </div>
                    <div className={product.action_container}>
                        <span className={product.price}>
                            {'$' + listing.salePrice}
                        </span>
                        <Button className={classes.button}>Add to Cart</Button>
                    </div>
                    <div className={product.details_container}>
                        {listing.category && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    category
                                </div>
                                <div className={product.details_text}>
                                    {listing.category}
                                </div>
                            </div>
                        )}
                        {listing.country && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    country
                                </div>
                                <div className={product.details_text}>
                                    {listing.country}
                                </div>
                            </div>
                        )}
                        {listing.type && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    type
                                </div>
                                <div className={product.details_text}>
                                    {listing.type}
                                </div>
                            </div>
                        )}
                        {listing.varietal && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    varietal
                                </div>
                                <div className={product.details_text}>
                                    {listing.varietal}
                                </div>
                            </div>
                        )}
                        {listing.winery && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    winery
                                </div>
                                <div className={product.details_text}>
                                    {listing.winery}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Listing;
