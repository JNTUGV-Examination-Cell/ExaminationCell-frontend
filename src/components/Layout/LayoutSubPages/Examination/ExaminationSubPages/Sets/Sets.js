import React, { useState } from 'react';
import './Sets.css';

function ExamCenterDashboard() {
    const [examCenter, setExamCenter] = useState("NM-Vignans Institute of Engineering for Women");

    const handleSettingsClick = () => {
        // Add logic for handling settings button click here
    }

    return (
        <div>
            <h1>Exam Center Dashboard - R111223 - B.Tech I Year I sem R20 Reg February 2023</h1>
            <button className="Button" onClick={handleSettingsClick}>Sets</button>
            <div className="message">
                <h1>You are hosting this examination for {examCenter}</h1>
            </div>
        </div>
    )
} 

export default ExamCenterDashboard;
