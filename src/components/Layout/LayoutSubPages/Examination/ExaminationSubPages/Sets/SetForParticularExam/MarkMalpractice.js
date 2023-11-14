import React, { useState, useEffect } from 'react';
import './MarkMalpractice.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectCurrentExam } from '../../../../../../../features/exams/examSlice';

const jsonData = [
  { Sno: 1, Hallticket: '22NM1A05B5' },
  { Sno: 2, Hallticket: '22NM1A04G9' },
  { Sno: 3, Hallticket: '22NM1A04G9' },
  { Sno: 4, Hallticket: '20VV1A1221' },
];

function MarkMalpractice() {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [Malpractice, setMalpractice] = useState([]);
  const [examData, setExamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(''); // Add your API endpoint or URL here
        const data = await response.json();

        setExamData(data);
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

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = jsonData.filter((item) =>
      item.Hallticket.toLowerCase().includes(searchWord.toLowerCase())
    );

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }

    setInputRollNumber(searchWord); // Set the input value to the searchWord
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
    setInputRollNumber('');
  };

  const currentExam = useSelector(selectCurrentExam);

  return (
    <div>
      <div>
        <Typography variant="h5">
          Mark Malpractice - {currentExam.currentExam} - {currentExam.currentExamName} - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM
        </Typography>
      </div>
      <br />
      <div className="set" align="center">
        <div className="set5">
          <div>
            <Typography variant="h5">Malpractice for the slot</Typography>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <label>Roll Numbers for marking Malpractice </label>
                <br />
                <input
                  type="text"
                  value={inputRollNumber}
                  onChange={handleFilter}
                />
                <div className="searchIcon">
                  {filteredData.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                  )}
                </div>
                {filteredData.length !== 0 && (
                  <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => (
                      <p key={key}>{value.Hallticket}</p>
                    ))}
                  </div>
                )}
                <Button type="submit" variant="contained" color="primary">
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
                <Typography variant="h5">CE - ENGINEERING PHYSICS</Typography>
                <br />
                <hr />
                <br />
                <Typography variant="h5">ME - ENGINEERING PHYSICS</Typography>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h5">Malpractice :</Typography>
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
