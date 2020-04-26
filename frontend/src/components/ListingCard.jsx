import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    withStyles,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
    return (
        <Card>
            <Link
                to={`/listings/${listing.listingId}`}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
                <CardActionArea>
                    <CardMedia image={listing.listingImage} />
                    <CardContent>
                        <Typography variant="h5" color="primary">
                            {listing.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <Button variant="contained" color="secondary">
                    Request
                </Button>
            </CardActions>
        </Card>
    );
};

export default ListingCard;
