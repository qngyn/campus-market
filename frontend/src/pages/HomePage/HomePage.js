import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Product from '../../components/Product/Product';
import products from '../../products';

const HomePage = () => {
    return (
        <>
            <main>
                <Container>
                    <h1>Latest Products</h1>
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={4} md={3}>
                                <Product product={product} key={product._id} />
                            </Grid>
                        ))}
                    </Grid>

                </Container>
            </main>

        </>
        /* 
        <div>
            
        </div>
         */

    )
}

export default HomePage;
