import React from 'react';
import card from '../css/product-card.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, Button, Card, CardActionArea } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '17rem',
        backgroundColor: 'var(--card-color)',
    },
    button: {
        fontFamily: 'Open Sans',
    },
});
const GoldButton = withStyles({
    root: {
        color: 'var(--gold)',
        border: 'none',
        '&:hover': {},
        fontFamily: 'Open Sans',
        fontSize: '.9em',
        fontWeight: '800',
        textTransform: 'none',
        padding: '.1rem .3rem',
    },
})(Button);
const ProductCard = ({ product }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Link
                to={`/liquors/${product.id}`}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
                <CardActionArea className={classes.button}>
                    <div className={card.pic_bg}>
                        <img
                            src={product.img}
                            className={card.pic}
                            alt="product"
                        />
                    </div>
                    <div className={card.content_bg}>
                        <h2 className={card.name}>
                            {product.type === 'wine' &&
                                `${product.winery} ${product.varietal}, ${product.vintage}`}
                            {product.type === 'beer' && `${product.producer}`}
                        </h2>
                        <span className={card.size}>
                            {product.size + 'ml, ' + product.pack + ' pack'}
                        </span>
                        <span className={card.price}>
                            {'$' + product.salePrice}
                        </span>
                    </div>
                </CardActionArea>
            </Link>
            <div className={card.button_bg}>
                <GoldButton>Add to Cart</GoldButton>
            </div>
        </Card>
    );
};

export default ProductCard;
