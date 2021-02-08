import { Card, CardContent, CardHeader, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
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
                <Typography variant='body1' component={Link} to={`/product/${product._id}`}>
                    {product.name}
                </Typography>
                <Typography variant='body2'>
                    {product.rating} from {product.numReviews} reviews
                </Typography>

                <Typography variant='h6'>
                    ${product.price}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default Product
