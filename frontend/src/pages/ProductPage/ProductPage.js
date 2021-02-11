import { Button, Divider, Grid, List, ListItem, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating/Rating';
import useStyles from './styles.js';

const ProductPage = (props) => {
    const classes = useStyles();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${props.match.params.id}`);
            setProduct(data);
        }
        fetchProduct();
    }, []);

    return (
        <>
            <Button component={Link} to='/'>
                Go Back
            </Button>
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
        </>
    )
}

export default ProductPage;
