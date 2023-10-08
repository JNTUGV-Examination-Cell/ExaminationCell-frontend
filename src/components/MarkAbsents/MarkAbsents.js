import React, { useState, useEffect } from 'react';
import './MarkAbsents.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MarkAbsent() {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [Absents, setAbsents] = useState([]);
  const [examData, setexamData] = useState([]);

  // Simulate fetching dynamic data when the component mounts
  useEffect(() => {
    // Simulate fetching data from an API or other source
    const fetchData = async () => {
      try {
        // Replace with actual data fetching logic
        const response = await fetch('your_api_endpoint_here');
        const data = await response.json();

        // Assuming the data is an array of strings
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
      setAbsents([...Absents, inputRollNumber]);

      setInputRollNumber('');
      window.alert('Roll number marked as absent.');
    }
  };

  return (
    <div>
      <div>
        <Typography variant="h4">
          Mark Absents - {examData.join(' - ')}
        </Typography>
      </div>
      <br />
      <div className='set' align='center'>
        <div className='set5'>
          <div>
            <Typography variant='h5'>Absents for the slot</Typography>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <label>Roll Numbers for marking Absents </label><br />
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
            </form>
          </div>
        </div>
      </div>

      <div>
        <Typography variant='h5'>Absents : </Typography>
        <ul>
          {Absents.map((rollNumber, index) => (
            <li key={index}>{rollNumber}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MarkAbsent;
