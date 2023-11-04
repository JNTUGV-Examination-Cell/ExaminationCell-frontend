import React, { useState, useEffect } from 'react';
import './InternalMarks.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel'; 
import FormControl from '@mui/material/FormControl'; 
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



const jsonData = [
  { SIno: 1, Hallticket: '22NM1A05B5', Name: 'PALADUGU ANITHA', Branch: 'CSE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 23 },
  { SIno: 2, Hallticket: '22NM1A04G9', Name: 'YENUMULA VIRAJA SHANMUKHI', Branch: 'ECE', SubjectCode: 'R201101', Subject: 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks: 28 },
  { SIno: 3, Hallticket: '22NM1A04G9', Name: 'YENUMULA VIRAJA SHANMUKHI', Branch: 'ECE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 27 },
  { SIno: 4, Hallticket: '22NM1A04G8', Name: 'YELLAMELLI ANKITA', Branch: 'ECE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 24 },
  { SIno: 5, Hallticket: '22NM1A04G6', Name: 'YARIPALLI AMANI', Branch: 'ECE', SubjectCode: 'R201115', Subject: 'APPLIED CHEMISTRY', FinalInternalMarks: 25 },
  { SIno: 6, Hallticket: '22NM1A04G6', Name: 'YARIPALLI AMANI', Branch: 'ECE', SubjectCode: 'R201101', Subject: 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks: 26 },
  { SIno: 7, Hallticket: '22NM1A04G6', Name: 'YARIPALLI AMANI', Branch: 'ECE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 24 },
  { SIno: 8, Hallticket: '22NM1A04F6', Name: 'VAITLA SUREKHA', Branch: 'ECE', SubjectCode: 'R201101', Subject: 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks: 26 },
];

function InternalMarks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [internalmarks] = useState('R111223-B.Tech Ist Year I Sem R20 Reg February 2023');
  const dataKey = 'internalMarksData';

  useEffect(() => {
    const storedData = localStorage.getItem(dataKey);
    if (storedData) {
      setFilteredData(JSON.parse(storedData));
    } else {
      setFilteredData(jsonData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(dataKey, JSON.stringify(filteredData));
  }, [filteredData]);

  useEffect(() => {
    
    let filteredData = jsonData.filter((user) =>
      
      (user.Hallticket.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Subject.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedBranch === 'All' || user.Branch === selectedBranch) 
    );

    setFilteredData(filteredData);
  }, [searchQuery, selectedBranch, selectedSubject]);

  
  const generateCSV = () => {
    const header = 'Sl no,Hallticket,Name,Branch,Subject Code,Subject,Final Internal Marks\n';
    const csvData = filteredData.map((user) =>
      `${user.Slno},${user.Hallticket},${user.Name},${user.Branch},${user.SubjectCode},${user.Subject},${user.FinalInternalMarks}`
    );
    return header + csvData.join('\n');
  };
  
  const downloadCSV = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'internal_marks.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSearchInputClick = () => {
    setSelectedSubject('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'searchQuery') {
      setSearchQuery(value);
    } else if (name === 'selectedSubject') {
      setSelectedSubject(value);
    }
  };


  return (
    <div className="page-container">
      <div className="header">
        <Typography variant="h5" className="main-heading">
        Internal Marks - {internalmarks}
        </Typography>
      </div>

      <div className="buttons">
        <Button 
          className="download-button"
          onClick={downloadCSV}
          style={{ backgroundColor: '#B0E0E6', color:'black' }}
          variant="contained"
        >
          Download Final Internal Marks
        </Button>
      </div>

      <center>
        <Typography variant="h5" className="sub-heading">
          List of Students with Final Internal Marks
        </Typography>
      </center>
      <div className='wrap'>
        <div className='search-container'>
      <div className="search-bar">
        <TextField
          label="Search by Hallticket/Name/Subject"
          variant="outlined"
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => handleInputChange(e)}
          fullWidth
          onClick={handleSearchInputClick}
        />
      </div>
      <div className="branch-filter">
  <FormControl variant="outlined" className="branch-select" style={{ width: '265px' }}>
    <InputLabel htmlFor="branch-select" style={{alignItems:'center'}}>Filter</InputLabel>
    <Select
      label="Branch"
      value={selectedBranch}
      onChange={(e) => setSelectedBranch(e.target.value)}
    >
      <MenuItem value="All">Select Branch</MenuItem>
      <MenuItem value="CSE">CSE</MenuItem>
      <MenuItem value="ECE">ECE</MenuItem>
      <MenuItem value="IT">IT</MenuItem>
      <MenuItem value="CIVIL">CIVIL</MenuItem>
      <MenuItem value="MET">MET</MenuItem>
      <MenuItem value="MECH">MECH</MenuItem>
      <MenuItem value="CHEMICAL">CHEMICAL</MenuItem>
      <MenuItem value="EEE">EEE</MenuItem>
    </Select>
  </FormControl>
</div>
      </div>
      </div>
      <div className="table-container" style={{ width: '116%' }}>
      <Paper elevation={3}>
        <Table className="data-table" style={{ minWidth: '800px', maxWidth: '1350px'}}>
          <TableHead>
            <TableRow className="table-header-cell">
              <TableCell align="center">Sl.no</TableCell>
              <TableCell align="center">Hallticket</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Branch</TableCell>
              <TableCell align="center">Subject Code</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Final Internal Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <TableRow
                  key={user.Slno}
                  className={`table-row ${index % 2 === 0 ? 'even-row' : ''} hover-row`}
                >
                  <TableCell align="center">{user.SIno}</TableCell>
                  <TableCell align="center">{user.Hallticket}</TableCell>
                  <TableCell align="center">{user.Name}</TableCell>
                  <TableCell align="center">{user.Branch}</TableCell>
                  <TableCell align="center">{user.SubjectCode}</TableCell>
                  <TableCell align="center">{user.Subject}</TableCell>
                  <TableCell align="center">{user.FinalInternalMarks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>No matching records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
    </div>
  );
}

export default InternalMarks;



