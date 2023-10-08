// eslint-disable-next-line
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Sets.css'; 

const CustomComponent = () => {
    const [college, setCollege] = useState("NM-Vignans Institute of Engineering for women");
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        setCollege("New College Name"); 
        navigate('/otherpage');
    }

    return (
        <div>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Exam Center Dashboard - R111223 - B.Tech I Year I sem R20 Reg February 2023
            </Typography>
            <Button variant="contained" onClick={handleSettingsClick}>Sets</Button>
            <div className="message-container">
                <Typography variant="h5">
                    You are hosting this examination for {college}
                </Typography>
            </div>
        </div>
    )
} 

export default CustomComponent;
