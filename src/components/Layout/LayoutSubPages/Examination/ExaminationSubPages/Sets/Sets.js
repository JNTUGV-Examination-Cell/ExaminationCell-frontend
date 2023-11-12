// eslint-disable-next-line
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Sets.css'; 
import { useSelector } from 'react-redux';
import { selectCurrentExam } from '../../../../../../features/exams/examSlice';

const CustomComponent = () => {
    const [college, setCollege] = useState("NM-Vignans Institute of Engineering for women");
    const navigate = useNavigate();
    const currentExam = useSelector(selectCurrentExam);
    const handleSettingsClick = () => {
        setCollege("New College Name"); 
        navigate('/layout/examdata/manageexamination/Sets/examsets');
    }

    return (
        <div>
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
                Exam Center Dashboard - {currentExam.currentExam} - {currentExam.currentExamName}
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
