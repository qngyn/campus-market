import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import { listProducts } from '../../actions/productActions';

const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : <Grid container spacing={2}>
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
