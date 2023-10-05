import React from 'react';
import './Sets.css';

function App() {
    return (
        <div>
            <h1>Exam Center Dashboard - R111223 - B.Tech I Year I sem R20 Reg February 2023 </h1>
            <button className="Button" onClick={handleSettingsClick}>Sets</button>
            <div className="message">
            <h1>You are hosting this examination for NM-Vignans Institute of Engineering for women</h1></div>
        </div>
       
    )
} 

function handleSettingsClick() {
    // Add logic for handling settings button click here
}

export default App;