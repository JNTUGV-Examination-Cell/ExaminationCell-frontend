import React, { useState } from 'react';
import './MarkAbsents.css';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { selectCurrentExam } from '../../../../../../../features/exams/examSlice';

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
  const currentExam = useSelector(selectCurrentExam);
  return (
    <div>
      <div>
        <h1>Mark Absent - {currentExam.currentExam} - {currentExam.currentExamName} - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM</h1>
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
                <Button type='submit' variant='contained' color='primary'>
                  Proceed
                </Button>
              </div>
              <hr />
              <div>
                <h4>CE - ENGINEERING PHYSICS</h4>
                <hr />
                <h4>ME - ENGINEERING PHYSICS</h4>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <h2>Absentees:</h2>
        
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