import React, { useEffect } from 'react';
import '../css/landing.css';
import { Button, withStyles } from '@material-ui/core';
import Logo from '../css/assets/logo.png';

const Landing = (props) => {
    useEffect(() => {
        const authToken = localStorage.getItem('FBIdToken');
        if (authToken) console.log('Auth token in local storage');
        else console.log('No token stored, go log in');
    }, []);
    return (
        <main className="bg">
            <img src={Logo} alt="logo" style={{ width: '30vw' }} />
            <div className="center">Our landing page</div>
        </main>
    );
};

export default Landing;
