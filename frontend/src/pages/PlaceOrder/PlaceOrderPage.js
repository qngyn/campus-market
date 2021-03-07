import React from 'react'
import { useSelector } from 'react-redux';
import CheckoutProgress from '../../components/CheckoutProgress/CheckoutProgress.js';
import { Button, Card, CardContent, Divider, Grid, List, ListItem, Typography } from '@material-ui/core';
import MessageBox from '../../components/MessageBox/MessageBox.js';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';

const PlaceOrderPage = () => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    
    // insist 2 decimal places (ex: $15.20)
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }
    // calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    ));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);

    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);
   
    const placeOrderHandler = () => {

    };

    return (
        <div>
            <CheckoutProgress step={3} />
            <Grid container spacing={4}>
                <Grid item md={8}>
                    <List>
                        <ListItem style={{ display: 'block' }}>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>Shipping</Typography>
                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Address: </strong>
                                <br />
                                {cart.shippingAddress}
                            </Typography>

                        </ListItem>
                        <Divider />

                        <ListItem style={{ display: 'block' }}>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>Payment Method</Typography>
                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Method: </strong>
                                <br />
                                {cart.paymentMethod}
                            </Typography>
                        </ListItem>

                        <Divider />
                        <ListItem style={{ display: 'block' }}>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>Order Items</Typography>
                            {cart.cartItems.length === 0 ? <MessageBox>Your cart is empty</MessageBox> : (
                                <List style={{ display: 'block' }}>
                                    {cart.cartItems.map((item, index) => (
                                        <ListItem key={index}>
                                            <Grid container spacing={4}>
                                                <Grid item md={1} >
                                                    <img src={item.image} alt={item.name} className={classes.image} />
                                                </Grid>
                                                <Grid item>
                                                    <Link to={`/product/${item.productId}`}>
                                                        <strong> {item.name} </strong>
                                                    </Link>
                                                </Grid>

                                                <Grid item md={4}>
                                                    {item.quantity} x ${item.price} = {item.quantity * item.price}
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Method: </strong>
                                <br />
                                {cart.paymentMethod}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item md={4}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }} gutterBottom>Order Summary</Typography>
                            <List>
                                <ListItem>
                                    <Grid container spacing={2}>
                                        <Grid item className={classes.gridItemLeft}>
                                            <Typography variant='body1'>
                                                Items
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='body1'>
                                                {cart.itemsPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <Grid container spacing={2}>
                                        <Grid item className={classes.gridItemLeft}>
                                            <Typography variant='body1'>
                                                Shipping
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='body1'>
                                                {cart.shippingPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <Grid container spacing={2}>
                                        <Grid item className={classes.gridItemLeft}>
                                            <Typography variant='body1'>
                                                Tax
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='body1'>
                                                {cart.taxPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <Grid container spacing={2}>
                                        <Grid item className={classes.gridItemLeft}>
                                            <Typography variant='body1'>
                                                Total
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='body1'>
                                                {cart.totalPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider />

                                <ListItem>
                                    <Button
                                        onClick={placeOrderHandler}
                                        variant='contained'
                                        className={classes.placeOrderButton}
                                        disabled={cart.cartItems === 0}
                                    >
                                        Add to cart
                                    </Button>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default PlaceOrderPage
