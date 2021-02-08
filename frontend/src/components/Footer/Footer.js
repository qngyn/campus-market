import { Container, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles.js';

const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Container>
                <div style={{textAlign: 'center'}}>
                    <Typography variant='body2'>
                        Copyright &copy; Campus Market
                    </Typography>
                </div>

            </Container>
        </footer>
    );
}

export default Footer;