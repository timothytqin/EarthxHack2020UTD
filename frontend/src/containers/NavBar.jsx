import { UTD_LOGO } from '../css/images';
import { getCredentials, logout } from '../api/auth';

import React, { useEffect, useState } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Container, Link } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListings } from '../actions/fetchListings';
import { getNumNotifications } from '../selectors';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { receiveCredentials } from '../actions/receiveCredentials';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function NavBar(props) {
    const numNotifications = useSelector((state) => getNumNotifications(state));
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const username = useSelector((state) => state.user.credentials.username);
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem('FBIdToken')
    );

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge color="secondary">
                        <ChatIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show new notifications" color="inherit">
                    <Badge badgeContent={numNotifications} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (
            props.location.pathname !== '/signup' &&
            props.location.pathname !== '/login'
        ) {
            dispatch(showLoading());
            const cachedToken = localStorage.getItem('FBIdToken');
            if (cachedToken) {
                console.log('CACHE FOUND');
                getCredentials()
                    .then((res) => {
                        dispatch(receiveCredentials(res.data));
                        dispatch(hideLoading());
                        dispatch(fetchListings());
                    })
                    .catch((err) => {
                        console.log(err);
                        logout();
                        props.history.push('/login');
                    });
            } else {
                logout();
                props.history.push('/login');
            }
            setAuthenticated(localStorage.getItem('FBIdToken'));
        }
    }, [props.location.pathname, props.history, dispatch]);

    return (
        <div className={classes.grow}>
            <LoadingBar
                style={{ backgroundColor: '#EDCE86', zIndex: '1200' }}
            />
            <Toolbar />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        aria-label="show 4 new mails"
                        color="inherit"
                        href="/"
                    >
                        <img
                            src={UTD_LOGO}
                            style={{ width: '2em', marginRight: '1em' }}
                            alt="UTD Logo"
                        />
                        <Typography
                            className={classes.title}
                            variant="h4"
                            noWrap
                        >
                            Rentech
                        </Typography>
                    </IconButton>
                    {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
                    <div className={classes.grow} />
                    {/* <div className={classes.sectionDesktop}> */}
                    {authenticated && authenticated[0] ? (
                        <div>
                            <IconButton
                                aria-label="dashboard"
                                color="inherit"
                                href="/listings"
                            >
                                <DashboardIcon />
                            </IconButton>
                            <IconButton
                                aria-label="dms"
                                color="inherit"
                                href="/chat"
                            >
                                <Badge color="secondary">
                                    <ChatIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="notifications"
                                color="inherit"
                                href="/notifications"
                            >
                                <Badge
                                    badgeContent={numNotifications}
                                    color="secondary"
                                >
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>

                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                href={`/u/${username}`}
                                // onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <IconButton
                                aria-label="logout"
                                color="inherit"
                                href="/login"
                                onClick={() => logout()}
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </div>
                    ) : (
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                                href="/login"
                            >
                                <VpnKeyIcon />
                                <Typography
                                    variant={'h5'}
                                    style={{ marginLeft: '.2em' }}
                                >
                                    Log In
                                </Typography>
                            </IconButton>
                            <IconButton
                                aria-label="logout"
                                color="inherit"
                                href="/signup"
                            >
                                <PersonAddIcon />
                                <Typography
                                    variant={'h5'}
                                    style={{ marginLeft: '.2em' }}
                                >
                                    Sign Up
                                </Typography>
                            </IconButton>
                        </div>
                    )}

                    {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
                </Toolbar>
            </AppBar>
            {/* {renderMobileMenu} */}
            {/* {renderMenu} */}
        </div>
    );
}
