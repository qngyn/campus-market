import React from 'react';
import Alert from '@material-ui/lab/Alert';

const MessageBox = (props) => {
    const { severity, text } =  props;
    return (
        <Alert severity={severity}>{text}</Alert>
    )
}

MessageBox.defaultProps = {
    severity: 'info'
}

export default MessageBox;
