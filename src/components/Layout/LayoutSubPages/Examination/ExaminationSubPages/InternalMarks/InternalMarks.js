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

const jsonData = [
  { Slno: 1, Hallticket: '22NM1A05B5', Name: 'PALADUGU ANITHA', Branch: 'CSE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 23 },
  { Slno: 2, Hallticket: '22NM1A04G9', Name: 'YENUMULA VIRAJA SHANMUKHI', Branch: 'ECE', SubjectCode: 'R201101', Subject: 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks: 28 },
  { Slno: 3, Hallticket: '22NM1A04G9', Name: 'YENUMULA VIRAJA SHANMUKHI', Branch: 'ECE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 27 },
  { Slno: 4, Hallticket: '22NM1A04G8', Name: 'YELLAMELLI ANKITA', Branch: 'ECE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 24 },
  { Slno: 5, Hallticket: '22NM1A04G6', Name: 'YARIPALLI AMANI', Branch: 'ECE', SubjectCode: 'R201115', Subject: 'APPLIED CHEMISTRY', FinalInternalMarks: 25 },
  { Slno: 6, Hallticket: '22NM1A04G6', Name: 'YARIPALLI AMANI', Branch: 'ECE', SubjectCode: 'R201101', Subject: 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks: 26 },
  { Slno: 7, Hallticket: '22NM1A04G6', Name: 'YARIPALLI AMANI', Branch: 'ECE', SubjectCode: 'R201102', Subject: 'COMMUNICATIVE ENGLISH', FinalInternalMarks: 24 },
  { Slno: 8, Hallticket: '22NM1A04F6', Name: 'VAITLA SUREKHA', Branch: 'ECE', SubjectCode: 'R201101', Subject: 'MATHEMATICS-I[CALCULUS]', FinalInternalMarks: 26 },
];

function InternalMarks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [internalmarks]=useState('');
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
      
      (user.Hallticket.includes(searchQuery) ||
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
        <Typography variant="h4" className="main-heading">
        Internal Marks - {internalmarks}
        </Typography>
      </div>

      <div className="buttons" style={{paddingTop:'10px',}}>
        <button className="download-button" onClick={downloadCSV} style={{backgroundColor:'#c0c0c0'}}>
        <Typography variant="b" className="main-heading">
          Download Final Internal Marks
        </Typography>
        </button>
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
  <FormControl variant="outlined" className="branch-select" style={{ width: '200px' }}>
    <InputLabel htmlFor="branch-select">Filter</InputLabel>
    <Select
      label="Branch"
      value={selectedBranch}
      onChange={(e) => setSelectedBranch(e.target.value)}
    >
      <MenuItem value="All">Select Branch</MenuItem>
      <MenuItem value="CSE">CSE</MenuItem>
      <MenuItem value="ECE">ECE</MenuItem>
      <MenuItem value="CSE">IT</MenuItem>
      <MenuItem value="ECE">CIVIL</MenuItem>
      <MenuItem value="CSE">MET</MenuItem>
      <MenuItem value="ECE">MECH</MenuItem>
      <MenuItem value="CSE">CHEMICAL</MenuItem>
      <MenuItem value="ECE">EEE</MenuItem>
    </Select>
  </FormControl>
</div>
      </div>
      </div>
      <Paper elevation={3} className="table-container" style={{ width: '120%' }}>
        <Table className="data-table">
          <TableHead>
            <TableRow>
              <TableCell>Sl.no</TableCell>
              <TableCell>Hallticket</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Subject Code</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Final Internal Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((user, index) => (
                <TableRow
                  key={user.Slno}
                  className={`table-row ${index % 2 === 0 ? 'even-row' : ''} hover-row`}
                >
                  <TableCell>{user.Slno}</TableCell>
                  <TableCell>{user.Hallticket}</TableCell>
                  <TableCell>{user.Name}</TableCell>
                  <TableCell>{user.Branch}</TableCell>
                  <TableCell>{user.SubjectCode}</TableCell>
                  <TableCell>{user.Subject}</TableCell>
                  <TableCell>{user.FinalInternalMarks}</TableCell>
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
  );
}

export default InternalMarks;



