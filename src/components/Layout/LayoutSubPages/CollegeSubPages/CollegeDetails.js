import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import CollegeData from './CollegeData';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const jsonData = CollegeData;
const CollegePage = () => {
  const navigate = useNavigate();

  const handleManageClick = () => {
    // Navigate to the file upload page
    navigate('/file-upload');
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>College Name</TableCell>
            <TableCell>College Code</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Postal Address</TableCell>
            <TableCell>Pincode</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.college_name}</TableCell>
              <TableCell>{row.college_code}</TableCell>
              <TableCell>{row.District}</TableCell>
              <TableCell>{row.Type}</TableCell>
              <TableCell>{row.Postal_Address}</TableCell>
              <TableCell>{row.Pincode}</TableCell>
              <TableCell>{row.Status}</TableCell>
              <TableCell>
              <Button onClick={handleManageClick}>Manage</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegePage;
