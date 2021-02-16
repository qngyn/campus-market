import { Button, Divider, FormControl, Grid, InputLabel, List, ListItem, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../../actions/productActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import MessageBox from '../../components/MessageBox/MessageBox';
import Rating from '../../components/Rating/Rating';
import useStyles from './styles.js';

const ProductPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProductDetails(props.match.params.id));
    }, [dispatch]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?quantity=${quantity}`); // redirect to cart page
    }

    return (
        <>
            <Button component={Link} to='/'>
                Go Back
            </Button>
            {loading ? <LoadingSpinner /> : error ? <MessageBox severity='error'>{error}</MessageBox> : (
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <img src={product.image} alt={product.name} className={classes.image} />
                    </Grid>
                    <Grid item md={3}>
                        <List>
                            <ListItem>
                                <Typography variant='h5'>{product.name}</Typography>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Typography variant='body1'>
                                    Price: ${product.price}
                                </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Typography variant='body1'>
                                    Description: {product.description}
                                </Typography>
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item md={3}>
                        <List>
                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item className={classes.gridItemLeft}>
                                        <Typography variant='body1'>
                                            Price:
                                    </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1'>
                                            <strong>${product.price}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item className={classes.gridItemLeft}>
                                        <Typography variant='body1'>
                                            Status:
                                    </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1'>
                                            <strong>{product.countInStock > 0 ? 'Available' : 'Not Available'}</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>

                            {product.countInStock > 0 && (
                                <ListItem>
                                    <Grid containter spacing={2} style={{display: 'flex', alignItems: 'center'}}>
                                        <Grid item className={classes.gridItemLeft}>
                                            <Typography variant='body1'>
                                                Quantity:
                                            </Typography>
                                        </Grid>

                                        <Grid item>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="select-product-quantity-label"></InputLabel> 
                                                <Select
                                                    labelId="select-product-quantity-label"
                                                    id="product-quantity"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                    // label="Quantity"
                                                    style={{height:45}}
                                                >
                                                    {
                                                        [...Array(product.countInStock).keys()].map(count => (
                                                            <MenuItem key={count + 1} value={count + 1}>{count + 1}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )}
                            <ListItem>
                                <Button
                                    onClick={addToCartHandler}
                                    variant='contained' 
                                    className={classes.addToCartButton} 
                                    disabled={product.countInStock === 0}
                                >
                                    Add to cart
                            </Button>
                            </ListItem>

                        </List>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default ProductPage;
