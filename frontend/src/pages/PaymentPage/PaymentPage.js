import React, { useState } from 'react';
import { Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';

import useStyles from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions.js';
import CheckoutProgress from '../../components/CheckoutProgress/CheckoutProgress.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const PaymentPage = (props) => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <CheckoutProgress step={2} /> {/* payment page is the 3nd step in the progess - count from 0 */}
                <Typography component="h1" variant="h4" className={classes.titleTypography} >
                    Payment Method
                </Typography>
                <form onSubmit={submitHandler}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose Your Payment Method</FormLabel>
                        <RadioGroup aria-label="payment method" name="paymentMethod" value={paymentMethod} onChange={handlePaymentChange}>
                            <FormControlLabel value="PayPal" control={<Radio />} label="PayPal or Credit Card" />
                        </RadioGroup>
                    </FormControl>

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

export default PaymentPage
