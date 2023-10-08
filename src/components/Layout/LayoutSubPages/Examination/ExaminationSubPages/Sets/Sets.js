import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import './Sets.css';

const CustomComponent = () => {
    const [showMessage, setShowMessage] = useState(false);

    const handleSettingsClick = () => {
        setShowMessage(true);
    }

    return (
        <div>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Exam Center Dashboard - R111223 - B.Tech I Year I sem R20 Reg February 2023
            </Typography>
            <Button variant="contained" onClick={handleSettingsClick}>Sets</Button>
            {showMessage && (
                <div className="message">
                    <Typography variant="h5">
                        You are hosting this examination for NM-Vignans Institute of Engineering for women
                    </Typography>
                </div>
            )}
        </div>
    )
} 

export default CustomComponent;
