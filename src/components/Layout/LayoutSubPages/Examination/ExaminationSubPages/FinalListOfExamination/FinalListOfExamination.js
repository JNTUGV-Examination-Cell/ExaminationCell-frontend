import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,Typography } from '@mui/material';
import './FinalListOfExamination.css';
import ExcelJS from 'exceljs';

const jsonData = [
  { SIno: 1 , Hallticket: '22NM1A0201', Name:'AGARPU YASASWINI',Branch:'Electrical and Electronics Engineering',Mobile:'8121504788',Id:'8621010564'},
  { SIno: 2 , Hallticket: '22NM1A0203', Name:'ALLAVARAPU KUSUMA',Branch:'Electrical and Electronics Engineering',Mobile:'9966240149',Id:'9987213857'},
  { SIno: 3 , Hallticket: '22NM1A0204', Name:'ALLURI SANJULA',Branch:'Electrical and Electronics Engineering',Mobile:'8333022234',Id:'9902054338'},
  { SIno: 4 , Hallticket: '22NM1A0205', Name:'ARASADA CHANDINI',Branch:'Electrical and Electronics Engineering',Mobile:'9398209484',Id:'7874214661'},
  { SIno: 5 , Hallticket: '22NM1A0206', Name:'BALLA GAYATHRI',Branch:'Electrical and Electronics Engineering',Mobile:'8179845156',Id:'7108470975'},
  { SIno: 6 , Hallticket: '22NM1A0207', Name:'BANTUBILLI ANUSHA',Branch:'Electrical and Electronics Engineering',Mobile:'9346817970',Id:'5136547972'},
  { SIno: 7 , Hallticket: '22NM1A0208', Name:'BHUMIREDDY SAI DIVYA',Branch:'Electrical and Electronics Engineering',Mobile:'9949124498',Id:'2888664721'},
  { SIno: 8 , Hallticket: '22NM1A0209', Name:'BODDAPATI NANDINI',Branch:'Electrical and Electronics Engineering',Mobile:'9381486459',Id:'2181844270'},
];

function FinalListOfExamination() {
  const handleDownload = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Examination Data');

    
    const headers = ['SIno', 'Hallticket', 'Name', 'Branch', 'Mobile', 'Id'];
    worksheet.addRow(headers);

    
    jsonData.forEach((user) => {
      const row = [];
      headers.forEach((header) => {
        row.push(user[header]);
      });
      worksheet.addRow(row);
    });

    
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'exam_data.xlsx';
    link.click();
  };

  return (
    <div style={{ margin: '50px' }}>
      <Typography variant="h5">
        FINAL LIST OF EXAMINATION - R111223 - B.Tech I YEAR I SEM R20 REG FEBRUARY 2023
      </Typography>
      <Button variant="contained" color="primary" onClick={handleDownload} className='HTBtn' style={{ margin: '50px 0' }}>Download Hall Tickets</Button>
    
    
      <TableContainer component={Paper}>
        <Table style={{ marginTop: '100px' }}>
          <TableHead>
            <TableRow>
              <TableCell>SIno</TableCell>
              <TableCell>Hallticket</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.SIno}</TableCell>
                <TableCell>{user.Hallticket}</TableCell>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Branch}</TableCell>
                <TableCell>{user.Mobile}</TableCell>
                <TableCell>{user.Id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FinalListOfExamination;
