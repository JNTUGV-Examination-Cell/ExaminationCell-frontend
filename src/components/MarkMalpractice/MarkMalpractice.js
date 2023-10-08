import React, { useState, useEffect } from 'react';
import './MarkMalpractice.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MarkMalpractice() {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [Malpractice, setMalpractice] = useState([]);
  const [examData, setexamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("");
        const data = await response.json();

        setexamData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRollNumber.trim() !== '') {
      setMalpractice([...Malpractice, inputRollNumber]);

      setInputRollNumber('');
      window.alert('Roll number marked as Malpractice.');
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h4">
          Mark Malpractice - {examData.join(' - ')}
        </Typography>
      </div>
      <br />
      <div className='set' align='center'>
        <div className='set5'>
          <div>
            <Typography variant='h5'>Malpractice for the slot</Typography>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <label>Roll Numbers for marking Malpractice </label><br />
                <input
                  type='text'
                  value={inputRollNumber}
                  onChange={(e) => setInputRollNumber(e.target.value)}
                /><br />
                <Button type='submit' variant='contained' color='primary'>
                  {examData.length > 0 ? 'Proceed with Dynamic Data' : 'Proceed'}
                </Button>
              </div>
              <hr />
              <div>
                {examData.map((data, index) => (
                  <Typography key={index} variant="h4">
                    {data}
                  </Typography>
                ))}
              </div>
              <div>
                <Typography variant='h5'>CE - ENGINEERING PHYSICS</Typography><br></br>
                <hr /><br></br>
                <Typography variant='h5'>ME - ENGINEERING PHYSICS</Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Typography variant='h5'>Malpractice :</Typography>
        <ul>
          {Malpractice.map((rollNumber, index) => (
            <li key={index}>{rollNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MarkMalpractice;