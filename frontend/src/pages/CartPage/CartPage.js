import { Card, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, MenuItem, Select, Typography, Button } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import MessageBox from '../../components/MessageBox/MessageBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';

const CartPage = (props) => {
    const classes = useStyles();
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity));
        }
    }, []);
  
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping');
    }
    return (
        <Grid container spacing={2}>
            <Grid item md={8}>
                <Typography variant='h4' className={classes.titleTypography}>Shopping cart</Typography>
                {cartItems.length === 0 ? <MessageBox>Your cart is empty <Link to='/'>Go Back</Link></MessageBox> : (
                    <List>
                        {cartItems.map((item, index) => (
                            <Fragment key={item.name}>
                                <ListItem>
                                    <Grid container spacing={2}>
                                        <Grid item md={2}>
                                            <img src={item.image} alt={item.name} className={classes.image} />
                                        </Grid>

                                        <Grid item md={3}>
                                            <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                        </Grid>

                                        <Grid item md={2}>
                                            {item.price}
                                        </Grid>

                                        <Grid item md={2}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="select-product-quantity-label"></InputLabel>
                                                <Select
                                                    labelId="select-product-quantity-label"
                                                    id="product-quantity"
                                                    value={item.quantity}
                                                    onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value)))}
                                                    // label="Quantity"
                                                    style={{ height: 45 }}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(count => (
                                                            <MenuItem key={count + 1} value={count + 1}>{count + 1}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={2}>
                                            <IconButton aria-label='delete' onClick={() => removeFromCartHandler(item.productId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                {index !== cartItems.length - 1 && <Divider variant="inset" component="li" />}
                            </Fragment>

                        ))}
                    </List>
                )}
            </Grid>
            <Grid item md={4}>
                <Card style={{margin: "21.440px 0"}}>
                    <List>
                        <ListItem style={{display: 'block'}}>
                            <Typography variant='h5' style={{width: '100%'}}>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
                            </Typography>
                            <hr/>
                            <Typography variant='body1'>
                                ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                            </Typography>
                        </ListItem>

                        <ListItem style={{textAlign: 'center', display: 'block'}}>
                            <Button variant='contained' color='secondary' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed to checkout
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>

        </Grid>
    )
}

export default CartPage
