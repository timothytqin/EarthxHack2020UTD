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
                to={`/app/${listing.id}`}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
                <CardActionArea>
                    <CardMedia image={listing.img} />
                    <CardContent>
                        <Typography variant="h5" color="primary">
                            {listing.type === 'textbook'
                                ? `${listing.course} Textbook`
                                : `${listing.manufacturer} ${listing.model}`}
                        </Typography>
                        <Typography variant="subtitle1">
                            {listing.type === 'textbook' && `${listing.title}`}
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
