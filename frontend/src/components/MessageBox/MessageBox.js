import React from 'react';
import Alert from '@material-ui/lab/Alert';

const MessageBox = (props) => {
    const { severity, children } =  props;
    return (
        <Alert severity={severity}>{children}</Alert>
    )
}

MessageBox.defaultProps = {
    severity: 'info'
}

export default MessageBox;
