// SetForParticularExam.js
import React, { useState } from "react";
import "./SetForParticularExam.css";
import { Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
// Corrected import paths
// import DownloadDForm from './DownloadDForm';
import MarkAbsents from './MarkAbsents';
import MarkMalpractice from './MarkMalpractice';
import * as XLSX from 'xlsx';



function SetForParticularExam() {
  const [absentees, setAbsentees] = useState([]);
  const [malpractice, setMalpractice] = useState([]);
  const [showMarkAbsents, setShowMarkAbsents] = useState(false);
  const [showMarkMalpractice, setShowMarkMalpractice] = useState(false);
  
  const handleMarkAbsent = (rollNumber) => {
    console.log("Handling Mark Absent", rollNumber);
    setAbsentees([...absentees, rollNumber]);
  };

  const handleMarkMalpractice = (rollNumber) => {
    console.log("Handling Mark Malpractice", rollNumber);
    setMalpractice([...malpractice, rollNumber]);
  };

  const handleDownloadDForm = () => {
    const wb = XLSX.utils.book_new();

    // Create a worksheet for absentees
    const absenteeWS = XLSX.utils.json_to_sheet(
      absentees.map((rollNumber, index) => ({ 'Absentees RollNumber': rollNumber }))
    );
    XLSX.utils.book_append_sheet(wb, absenteeWS, 'Absentees');

    // Create a worksheet for malpractice
    const malpracticeWS = XLSX.utils.json_to_sheet(
      malpractice.map((rollNumber, index) => ({ 'Malpractice Students RollNumber': rollNumber }))
    );
    XLSX.utils.book_append_sheet(wb, malpracticeWS, 'Malpractice');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'Download_D_Form.xlsx');
  };

  const setstitle =
    'Sets - R111223 - B.Tech I Year I sem R20 Reg February 2023 - R201102 - COMMUNICATIVE ENGLISH - 20 February 2023 10:00 AM';
  const set = 'SET-1';
  const ntable = 'Not Available';

  const handleProceed = (section) => {
    console.log("Handling Proceed button click");

    if (section === "markAbsents") {
      setShowMarkAbsents(true);
      setShowMarkMalpractice(false);

    }
    else if (section === "markMalpractice"){
      setShowMarkMalpractice(true);
      setShowMarkAbsents(false);
    }
  }

  console.log("Rendering SetForParticularExam", showMarkAbsents, showMarkMalpractice);

  return (
    <div className="malpractice" align="center">
      <Typography variant="h5" className="head">
        {setstitle}
      </Typography>
      <Grid container spacing={2} className="buttons">
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout"
          >
            Sets Allocation
          </Button>
        </Grid>
        <Grid item>
        <Button
  variant="contained"
  style={{
    height: 30,
  }}
  
  onClick={() => handleProceed("markAbsents")}
>
  Mark Absent
</Button>


        </Grid>

        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout/examdata/manageexamination/Sets/examsets/setforparticularexam/markmalpractice"
            onClick={() => handleProceed("markMalpractice")}
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



      {showMarkAbsents && (
  <MarkAbsents handleMarkAbsent={handleMarkAbsent} absentees={absentees} />
)}

{showMarkMalpractice && (
        <MarkMalpractice
          handleMarkMalpractice={handleMarkMalpractice}
          malpractice={malpractice}
        />
      )}



    
    </div>
  );
}

export default SetForParticularExam;
