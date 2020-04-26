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

const ChatroomCard = ({ title, chatId }) => {
    return (
        <div
            style={{
                marginBottom: '2rem',
                backgroundColor: 'white',
                borderRadius: '1rem',
            }}
        >
            <Link
                to={`/chat/${chatId}`}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h5" color="primary">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </div>
    );
};

export default ChatroomCard;
