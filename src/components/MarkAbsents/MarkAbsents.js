import React, { useState } from 'react';
import './MarkAbsents.css';
import Button from '@mui/material/Button';

function MarkAbsents() {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [absentees, setAbsentees] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRollNumber.trim() !== '') {
      setAbsentees([...absentees, inputRollNumber]);

      setInputRollNumber('');
      window.alert('Roll number marked as absent.');
    }
  };

  return (
    <div>
      <div>
        <h1>Mark Absent - R111223 - B.Tech I Year I Sem R20 Reg February 2023 - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM</h1>
      </div>
      <br />
      <div className='set' align='center'>
        <div className='set5'>
          <div>
            <h4>Absentees for the Slot</h4>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <label>Roll Numbers for marking Absent </label><br />
                <input
                  type='text'
                  value={inputRollNumber}
                  onChange={(e) => setInputRollNumber(e.target.value)}
                /><br />
                {/* Material-UI Button */}
                <Button type='submit' variant='contained' color='primary'>
                  Proceed
                </Button>
              </div>
              <hr />
              <div>
                <Typography variant='h5'>CE - ENGINEERING PHYSICS</Typography>
                <hr />
                <Typography variant='h5'>ME - ENGINEERING PHYSICS</Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Typography variant='h5'>Absentees:</Typography>
        
        <ul>
          {absentees.map((rollNumber, index) => (
            <li key={index}>{rollNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MarkAbsents;
