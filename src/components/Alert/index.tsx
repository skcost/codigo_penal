import React from 'react';

import Alert from '@mui/material/Alert';

interface CustomAlertProps {
    type: 'warning' | 'info' | 'error' | 'success';
    message: string;
    className?: string;
}

const CustomAlert = ({
    message,
    type,
    className
}: CustomAlertProps) => (
    <Alert className={className} severity={type}>{message}</Alert>
);

export default CustomAlert;