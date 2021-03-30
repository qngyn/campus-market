import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';
import { Card, CardContent, CircularProgress, Divider, Grid, List, ListItem, Typography } from '@material-ui/core';
import MessageBox from '../../components/MessageBox/MessageBox.js';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';
import { getOrderDetails, payOrder } from '../../actions/orderActions.js';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../../contstants/orderConstants.js';

const OrderPage = (props) => {
    const classes = useStyles();

    const [payPalSdkReady, setPayPalSdkReady] = useState(false);
    const dispatch = useDispatch();

    const orderId = props.match.params.id;

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay; // rename loading to loadingPay and success to successPay
    
    
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data : clientId } = await axios.get('/api/config/paypal');
            
            /* dynamically add PayPal SDK Script */
            const script = document.createElement('script');
            script.type = '/text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            console.log("clientId: ", clientId);
            // script.async = true;
            script.onload = () => {
                console.log("check point onload script")
                setPayPalSdkReady(true);
            }
            script.onload()
            document.body.appendChild(script);
        }
        // addPayPalScript()    
        if (!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            // if order is not paid => add the paypal sdk script
            console.log("window: ", window)
            if (!window.paypal) {
                addPayPalScript(); 
            } else {
                setPayPalSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult));
    }
    return loading ? <LoadingSpinner /> : error ? <MessageBox severity='error'>{error}</MessageBox> : (
        <>
            <Typography component="h1" variant="h4" className={classes.titleTypography} >
                Order {orderId}
            </Typography>
            <Grid container spacing={4}>
                <Grid item md={8}>
                    <List>
                        <ListItem style={{ display: 'block' }}>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>Shipping</Typography>
                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Name: </strong> {order.user.name} 
                            </Typography>

                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Email: </strong> 
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </Typography>

                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Address: </strong>
                                <br />
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </Typography>

                            {order.isDelivered ? <MessageBox severity='success'> Delivered on {order.deliveredAt} </MessageBox> : 
                                <MessageBox severity='error'>Not Delivered</MessageBox>
                            }

                        </ListItem>
                        <Divider />

                        <ListItem style={{ display: 'block' }}>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>Payment Method</Typography>
                            <Typography variant='body1' style={{ fontFamily: 'Montserrat' }}>
                                <strong>Method: </strong>
                                <br />
                                {order.payment}
                            </Typography>

                            {order.isPaid ? <MessageBox severity='success'> Paid on {order.paidAt} </MessageBox> : 
                                <MessageBox severity='error'>Not Paid</MessageBox>
                            }
                        </ListItem>

                        <Divider />
                        <ListItem style={{ display: 'block' }}>
                            <Typography variant='h5' style={{ fontFamily: 'Montserrat' }}>Order Items</Typography>
                            {order.orderItems.length === 0 ? <MessageBox>Order is empty</MessageBox> : (
                                <List style={{ display: 'block' }}>
                                    {order.orderItems.map((item, index) => (
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
                                {order.payment}
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
                                                {order.itemsPrice}
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
                                                {order.shippingPrice}
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
                                                {order.taxPrice}
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
                                                {order.totalPrice}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>

                                {!order.isPaid && (
                                    <ListItem>
                                        {loadingPay && <CircularProgress />}
                                        {!payPalSdkReady ? <CircularProgress/> : (
                                            <PayPalButton 
                                                amount={order.totalPrice} 
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </ListItem>
                                )}
                                <Divider />

                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default OrderPage
