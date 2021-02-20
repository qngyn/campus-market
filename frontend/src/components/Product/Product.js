import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating.js';
import useStyles from './styles.js';

const Product = (props) => {
    const classes = useStyles();
    const { product } = props;
    return (
        <Card className={classes.card}>
            <Link to={`/product/${product._id}`} >
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                />
            </Link>
            <CardContent>
                <Typography variant='body1' component={Link} to={`/product/${product._id}`} className={classes.cartTitleTypography}>
                    {product.name}
                </Typography>

                <Rating value={product.rating} text={`${product.numReviews} reviews`} />

                <Typography variant='h6'>
                    ${product.price}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default Product
