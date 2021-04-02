import { AppBar, Badge, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import React, { useState } from 'react';
import useStyles from './styles.js';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CartIcon from '@material-ui/icons/AddShoppingCart';
import { logout } from '../../actions/userActions.js';
import ListRoundedIcon from '@material-ui/icons/ListRounded';

const Navbar = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [adminAnchorEl, setAdminAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isAdminMenuOpen = Boolean(adminAnchorEl);

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

    const handleAdminMenuOpen = (event) => {
        setAdminAnchorEl(event.currentTarget);
    };
    const handleAdminMenuClose = () => {
        setAdminAnchorEl(null);

    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const logoutHandler = () => {
        handleMenuClose();
        dispatch(logout());
        if (userInfo && userInfo.isAdmin) {
            // redirect to home
            if (window.location.pathname === '/admin/allusers') {
                window.location = '/'
            }
        }
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to='/profile'>Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
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
            <MenuItem component={Link} to="/cart">
                <IconButton aria-label="go to cart" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <CartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>

            {userInfo ? (
                <MenuItem component={Link} to='/profile' onClick={handleMobileMenuClose}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Typography variant='body1'>
                        Profile
                       </Typography>
                </MenuItem>
            ) : (
                <MenuItem component={Link} to='/login' onClick={handleMobileMenuClose}>
                    <IconButton
                        aria-label="go to sign in"
                        aria-controls="primary-search-signin-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Typography variant='body1'>
                        Sign In
                        </Typography>
                </MenuItem>

            )}


        </Menu>
    );

    return (
        <div>
            <AppBar position="static" className={classes.appBar}>
                <Container>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap component={Link} to='/'>
                            Campus Market
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton component={Link} to="/cart" aria-label="go to cart" color="inherit">
                                <Badge badgeContent={4} color="secondary" className={classes.badgeDesktop}>
                                    <CartIcon />
                                </Badge>
                                <Typography variant='body1'>
                                    Cart
                                </Typography>
                            </IconButton>
                            <IconButton aria-label="show new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary" className={classes.badgeDesktop}>
                                    <NotificationsIcon />
                                </Badge>
                                <Typography variant='body1'>
                                    Notifications
                                </Typography>
                            </IconButton>

                            <IconButton aria-label="show admin menu" 
                                aria-controls="admin-menu"
                                aria-haspopup="true"
                                onClick={handleAdminMenuOpen} 
                                color="inherit">
                                <ListRoundedIcon style={{marginRight: 5}}/>
                                <Typography variant='body1'>
                                    Manage
                                </Typography>
                            </IconButton>

                            {userInfo ? <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle className={classes.badgeDesktop} />
                                <Typography variant='body1'>
                                    {userInfo.name}
                                </Typography>
                            </IconButton> : <IconButton
                                component={Link}
                                to='/login'
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                // onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle className={classes.badgeDesktop} />
                                <Typography variant='body1'>
                                    Sign In
                                    </Typography>
                            </IconButton>}

                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </Container>

            </AppBar>
            {renderMobileMenu}
            {userInfo && renderMenu}
            {userInfo && userInfo.isAdmin && (
                <Menu
                    anchorEl={adminAnchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    id="admin-menu"
                    keepMounted
                    transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={isAdminMenuOpen}
                    onClose={handleAdminMenuClose}
                >
                    <MenuItem onClick={handleAdminMenuClose} component={Link} to='/admin/allusers'>All Users</MenuItem>
                    <MenuItem onClick={handleAdminMenuClose} component={Link} to='/admin/allproducts'>All Products</MenuItem>
                    <MenuItem onClick={handleAdminMenuClose} component={Link} to='/admin/allorders'>All Orders</MenuItem>
                </Menu>
            )}
        </div>
    )
}

export default Navbar
