import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        }
        fetchProducts()
    }, []);

    return (
        <>
            <h1>Latest Products</h1>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={4} md={3}>
                        <Product product={product} key={product._id} />
                    </Grid>
                ))}
            </Grid>

        </>

    )
}

export default HomePage;
