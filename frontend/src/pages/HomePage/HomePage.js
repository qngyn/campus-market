import { createMuiTheme, Grid, ThemeProvider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import { listProducts } from '../../actions/productActions';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import MessageBox from '../../components/MessageBox/MessageBox';

const titleFont = createMuiTheme({
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(','),
        fontWeightRegular: 300
    }
})
const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <ThemeProvider theme={titleFont}>
                <Typography variant='h4' style={{margin: "20px 0"}}>
                    LATEST PRODUCTS
                </Typography>
            </ThemeProvider>
            {loading ? <LoadingSpinner /> : error ? <MessageBox severity='error'>{error}</MessageBox> : <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={4} md={3}>
                        <Product product={product} key={product._id} />
                    </Grid>
                ))}
            </Grid>}
        </>

    )
}

export default HomePage;
