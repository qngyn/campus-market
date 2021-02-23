import React from 'react';
import Alert from '@material-ui/lab/Alert';
import useStyles from './styles.js';

const MessageBox = (props) => {
    const classes = useStyles();
    const { severity, children, className} =  props;
    return (
        <Alert severity={severity} className={className}>{children}</Alert>
    )
}

MessageBox.defaultProps = {
    severity: 'info'
}

export default MessageBox;
