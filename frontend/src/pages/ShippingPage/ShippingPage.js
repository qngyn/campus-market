import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';

import useStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions.js';

const ShippingPage = (props) => {
    const classes = useStyles();

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart; 

    const [address, setAddress] = useState(shippingAddress.address ? shippingAddress.address : '');
    const [city, setCity] = useState(shippingAddress.city ? shippingAddress.city : '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode ? shippingAddress.postalCode : '');
    const [country, setCountry] = useState(shippingAddress.country ? shippingAddress.country : '');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(address, city, postalCode, country));
        props.history.push('/payment');
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h4" className={classes.titleTypography} >
                    Shipping Details
                </Typography>
                <form onSubmit={submitHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Your Address"
                        name="address"
                        autoComplete="address"
                        autoFocus
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="Your City"
                        name="city"
                        autoComplete="city"
                        autoFocus
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="postalCode"
                        label="Your Postal Code"
                        name="postalCode"
                        autoComplete="postalCode"
                        autoFocus
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="country"
                        label="Your Country"
                        name="country"
                        autoComplete="country"
                        autoFocus
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Continue
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default ShippingPage
