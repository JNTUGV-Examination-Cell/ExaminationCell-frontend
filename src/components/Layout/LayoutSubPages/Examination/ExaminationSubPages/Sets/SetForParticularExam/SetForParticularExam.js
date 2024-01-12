import React, { useState, useEffect } from 'react';
import './SetForParticularExam.css';
import { Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function SetForParticularExam() {
  const [absentees, setAbsentees] = useState([]);
  const [malpractice, setMalpractice] = useState([]);

  // Load absentees and malpractice data from localStorage on component mount
  useEffect(() => {
    const storedAbsentees = localStorage.getItem('absentees');
    const storedMalpractice = localStorage.getItem('malpractice');

    
      if (storedAbsentees) {
        setAbsentees(JSON.parse(storedAbsentees));
      }
    
      if (storedMalpractice) {
        setMalpractice(JSON.parse(storedMalpractice));
      }
    }, []); // Provide an empty dependency array to ensure the effect runs only once on mount
    
  

    const handleDownloadDForm = () => {
      // Ensure that 'absentees' and 'malpractice' states are correctly populated
      console.log('Absentees:', absentees);
      console.log('Malpractice:', malpractice);
    
      // Create a new workbook
      const wb = XLSX.utils.book_new();
    
      // Create a worksheet for absentees
      const absenteeWS = XLSX.utils.json_to_sheet(absentees.map((rollNumber, index) => ({ 'Absentees RollNumber': rollNumber })));
      XLSX.utils.book_append_sheet(wb, absenteeWS, 'Absentees');
    
      // Create a worksheet for malpractice
      const malpracticeWS = XLSX.utils.json_to_sheet(malpractice.map((rollNumber, index) => ({ 'Malpractice Students RollNumber': rollNumber })));
      XLSX.utils.book_append_sheet(wb, malpracticeWS, 'Malpractice');
    
      // Save the workbook as an Excel file
      XLSX.writeFile(wb, 'Download_D_Form.xlsx');
    };
    

  const setstitle =
    'Sets - R111223 - B.Tech I Year I sem R20 Reg February 2023 - R201102 - COMMUNICATIVE ENGLISH - 20 February 2023 10:00 AM';
  const set = 'SET-1';
  const ntable = 'Not Available';

  return (
    <div className="malpractice">
      <Typography variant="h5" className="head">
        {setstitle}
      </Typography>
      <Grid container spacing={2} className="buttons">
        <Grid item>
          <Button variant="contained" style={{ height: 30 }} component={Link} to="/layout">
            Sets Allocation
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" style={{ height: 30 }} component={Link} to="/layout/markabsent">
            Mark Absent
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{ height: 30 }}
            component={Link}
            to="/layout/markmalpractice"
          >
            Mark MalPractice
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" style={{ height: 30 }} onClick={handleDownloadDForm}>
            Download D Form
          </Button>
        </Grid>
      </Grid>
      <div className="setblock">
        <Typography variant="h6" className="set">
          {set}
        </Typography>
        <hr style={{ width: '50%' }}></hr>
        <Typography variant="h6" className="ntable">
          {ntable}
        </Typography>
        <hr style={{ width: '50%' }}></hr>
      </div>
    </div>
  );
}

export default SetForParticularExam;
