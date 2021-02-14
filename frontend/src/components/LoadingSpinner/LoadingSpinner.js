import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles.js';

const LoadingSpinner = () => {
    const classes = useStyles();

    return (
        <CircularProgress className={classes.circularProgress}>
            <span>Loading</span>
        </CircularProgress>
    )
}

export default LoadingSpinner
