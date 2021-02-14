import { Button, Divider, Grid, List, ListItem, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
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

    useEffect(() => {
        dispatch(getProductDetails(props.match.params.id));
    }, [dispatch]);

    return (
        <>
            <Button component={Link} to='/'>
                Go Back
            </Button>
            {loading ? <LoadingSpinner /> : error ? <MessageBox severity='error' text={error} /> : (
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
                                <Grid item>
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
                                <Grid item>
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

                        <ListItem>
                            <Button variant='contained' className={classes.addToCartButton} disabled={product.countInStock === 0}>
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
