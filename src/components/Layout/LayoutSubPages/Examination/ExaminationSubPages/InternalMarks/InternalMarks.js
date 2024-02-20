import React, { useState, useEffect } from 'react';
import './InternalMarks.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { selectCurrentExam } from '../../../../../../features/exams/examSlice';
import { DataGrid } from '@mui/x-data-grid'; 

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
  const [filteredData, setFilteredData] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(''); // Define selectedSubject state
  const dataKey = 'internalMarksData';
  const currentExam = useSelector(selectCurrentExam);

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
        user.Name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedBranch === 'All' || user.Branch === selectedBranch)
    );

    setFilteredData(filteredData);
  }, [searchQuery, selectedBranch]);

  const generateCSV = () => {
    const header = 'Sl no,Hallticket,Name,Branch,Subject Code,Subject,Final Internal Marks\n';
    const csvData = filteredData.map((user) =>
      `${user.SIno},${user.Hallticket},${user.Name},${user.Branch},${user.SubjectCode},${user.Subject},${user.FinalInternalMarks}`
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

  const columns = [
    { field: 'SIno', headerName: 'Sl.no', width: 100 },
    { field: 'Hallticket', headerName: 'Hallticket', width: 200 },
    { field: 'Name', headerName: 'Name', width: 200 },
    { field: 'Branch', headerName: 'Branch', width: 150 },
    { field: 'SubjectCode', headerName: 'Subject Code', width: 200 },
    { field: 'Subject', headerName: 'Subject', width: 200 },
    {
      field: 'FinalInternalMarks',
      headerName: 'Final Internal Marks',
      width: 200,
      editable: true // Make the field editable
    },
  ];

  // Add unique identifiers to each row
  const enrichedData = filteredData.map((row, index) => ({
    id: index + 1, // Using index + 1 as a simple unique identifier
    ...row,
  }));

  return (
    <div className="page-container">
      <div className="header">
        <Typography variant="h5" className="main-heading">
          Internal Marks - {currentExam.currentExam}- {currentExam.currentExamName}
        </Typography>
      </div>

      <div className="buttons">
        <Button
          className="download-button"
          onClick={downloadCSV}
          style={{ backgroundColor: '#B0E0E6', color: 'black' }}
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
              <InputLabel htmlFor="branch-select" style={{ alignItems: 'center' }}>Filter</InputLabel>
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

      <div className="table-container" style={{ width: '100%' }}>
        <Paper elevation={3}>
          <DataGrid
            rows={enrichedData} // Use enrichedData with unique identifiers
            columns={columns}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            editRowsModel={editRowsModel} // Provide editRowsModel to track edited rows
            onEditCellChange={(editCellProps) => {
              const { id, field, props } = editCellProps;
              const updatedRow = {
                ...enrichedData.find(row => row.id === id),
                [field]: props.value
              };
              const updatedData = [...enrichedData];
              updatedData[id - 1] = updatedRow; // Assuming id starts from 1
              setFilteredData(updatedData); // Update the state with edited data
            }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default InternalMarks;
