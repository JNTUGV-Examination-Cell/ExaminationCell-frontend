import React, { useState, useEffect } from 'react';
import './MarkAbsents.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

const jsonData = [
  {Sno:1, Hallticket : '22NM1A05B5'},
  {Sno:2, Hallticket : '22NM1A04G9'},
  {Sno:3, Hallticket : '22NM1A04G9'},
]

function MarkAbsent() {
  const [inputRollNumber, setInputRollNumber] = useState('');
  const [Absents, setAbsents] = useState([]);
  const [examData, setexamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("Path");
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
      setAbsents([...Absents, inputRollNumber]);

      setInputRollNumber('');
      window.alert('Roll number marked as absent.');
    }
  };
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = jsonData.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
      <div>
        <Typography variant="h4">
          Mark Absents -  R111223 - B.Tech I Year I Sem R20 Reg February 2023 - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM
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
                  onChange={handleFilter}
                  /><br />
                  <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
        {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a className="dataItem" href={value.link} target="_blank">
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )}
                <Button type='submit' variant='contained' color='primary'>
                  {examData.length > 0 ? 'Proceed with Dynamic Data' : 'Proceed'}
                </Button>
              </div>
              <hr />
              {/* <div>
                {examData.map((data, index) => (
                  <Typography key={index} variant="h4">
                    {data}
                  </Typography>
                ))}
              </div> */}
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
