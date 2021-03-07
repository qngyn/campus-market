import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import useStyles from './styles.js';

const getSteps = () => {
    return ['Sign in', 'Shipping', 'Payment', 'Place Order'];
}

const CheckoutProgress = (props) => {
    const { step } = props;
    const [activeStep, setActiveStep] = useState(step);
    const steps = getSteps();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

export default CheckoutProgress
