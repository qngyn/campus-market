import React from 'react';
import Navbar from '../Navbar/Navbar.js';
import useStyles from './styles.js';

const Header = () => {
    const classes = useStyles();
    return (
        <header>
            <Navbar />
        </header>
    ); 
}

export default Header;