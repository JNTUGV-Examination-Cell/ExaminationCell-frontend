import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const DownloadDForm = ({ absentees, malpractice }) => {
  const handleDownloadDForm = () => {
    const wb = XLSX.utils.book_new();

    
    const absenteeWS = XLSX.utils.json_to_sheet(
      absentees.map((rollNumber, index) => ({ 'Absentees RollNumber': rollNumber }))
    );
    XLSX.utils.book_append_sheet(wb, absenteeWS, 'Absentees');

    
    const malpracticeWS = XLSX.utils.json_to_sheet(
      malpractice.map((rollNumber, index) => ({ 'Malpractice Students RollNumber': rollNumber }))
    );
    XLSX.utils.book_append_sheet(wb, malpracticeWS, 'Malpractice');

    
    XLSX.writeFile(wb, 'Download_D_Form.xlsx');
  };

  return (
    <div>
      <h1>Download D Form</h1>
      <Button variant="contained" onClick={handleDownloadDForm}>
        Download D Form
      </Button>
    </div>
  );
};

export default DownloadDForm;