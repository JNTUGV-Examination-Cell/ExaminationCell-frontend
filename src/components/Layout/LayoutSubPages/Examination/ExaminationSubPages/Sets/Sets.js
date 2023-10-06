import React from 'react';
import './Sets.css';

function App() {
    return (
        <div className='malpractice'>
           <div className='head'> <h1>Sets - R111223 - B.Tech I Year I sem R20 Reg February 2023 - R201102 - COMMUNICATIVE ENGLISH - 20 February 2023 10:00 AM</h1></div>
          
            <div className='buttons'>
            <button style={{ backgroundColor: 'lightblue', color: 'darkblue', marginRight: '10px',height:30 }}  onClick={handleSettingsClick}>Sets Allocation</button>
            <button style={{ backgroundColor: 'lightblue', color: 'darkblue' , marginRight: '10px',height:30}} onClick={handleSettingsClick}>Mark Absent</button>
            <button style={{ backgroundColor: 'lightblue', color: 'darkblue' , marginRight: '10px',height:30}} onClick={handleSettingsClick}>Mark MalPractice</button>
            <button style={{ backgroundColor: 'lightblue', color: 'darkblue', marginRight: '10px',height:30 }} onClick={handleSettingsClick}>Download D Form</button>
            </div>
            
            <div className='set'>
            <div className='setline1'>
               <div className='set1'>
                            <h3 >SET 1</h3>
                            <hr style={{ width: '60%' }} />
                            <h3 style={{ color: 'red' }}>Not Available</h3>
                            <hr style={{ width: '60%' }} />

                </div>
                <div className='set2'>
                            <h3 >SET 2</h3>
                            <hr style={{ width: '60%' }} />
                            <h3 style={{ color: 'red' }}>Not Available</h3>
                            <hr style={{ width: '60%' }} />
                </div>
            </div>
            <div className='setline2'>
               <div className='set3'>
                            <h3 >SET 3</h3>
                            <hr style={{ width: '60%' }} />
                            <h3 style={{ color: 'red' }}>Not Available</h3>
                            <hr style={{ width: '60%' }} />
                </div>
                <div className='set4'>
                            <h3 >SET 4</h3>
                            <hr style={{ width: '60%' }} />
                            <h3 style={{ color: 'red' }}>Not Available</h3>
                            <hr style={{ width: '60%' }} />
                </div>
            </div>
            </div>
        </div>
       
    )
} 

function handleSettingsClick() {
    // Add logic for handling settings button click here
}

export default App;