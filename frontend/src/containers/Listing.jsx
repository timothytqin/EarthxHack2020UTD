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
const Product = (props) => {
    const { id } = useParams();
    const liquor = useSelector((state) => getListing(state, id)); // have to use api call now
    const classes = useStyles();
    return (
        <>
            {liquor && (
                <div className={product.bg}>
                    <Card className={classes.root}>
                        <img
                            className={product.img}
                            src={liquor.img}
                            alt={`product id: ${id}`}
                        />
                    </Card>
                    <div className={product.title_container}>
                        <h1 className={product.name}>
                            {liquor.type === 'wine' &&
                                `${liquor.winery} ${liquor.varietal}, ${liquor.vintage}`}
                            {liquor.type === 'beer' && `${liquor.producer}`}
                        </h1>

                        <span className={product.size}>
                            {liquor.size + 'ml, ' + liquor.pack + ' pack'}
                        </span>
                    </div>
                    <div className={product.action_container}>
                        <span className={product.price}>
                            {'$' + liquor.salePrice}
                        </span>
                        <Button className={classes.button}>Add to Cart</Button>
                    </div>
                    <div className={product.details_container}>
                        {liquor.category && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    category
                                </div>
                                <div className={product.details_text}>
                                    {liquor.category}
                                </div>
                            </div>
                        )}
                        {liquor.country && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    country
                                </div>
                                <div className={product.details_text}>
                                    {liquor.country}
                                </div>
                            </div>
                        )}
                        {liquor.type && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    type
                                </div>
                                <div className={product.details_text}>
                                    {liquor.type}
                                </div>
                            </div>
                        )}
                        {liquor.varietal && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    varietal
                                </div>
                                <div className={product.details_text}>
                                    {liquor.varietal}
                                </div>
                            </div>
                        )}
                        {liquor.winery && (
                            <div className={product.details_row}>
                                <div className={product.details_label}>
                                    winery
                                </div>
                                <div className={product.details_text}>
                                    {liquor.winery}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Product;
