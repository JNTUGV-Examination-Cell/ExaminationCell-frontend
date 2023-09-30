import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import StaffData from "./StaffData";

const Staff = () => {
  const jsonData = StaffData;
  return (
    <Box>
      Staff
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl.No</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Staff Id</TableCell>
              <TableCell>Id Number</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active Roles</TableCell>
              <TableCell>Working Status</TableCell>
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
                <TableCell>{row.qr_code}</TableCell>
                <TableCell>{row.staff_id}</TableCell>
                <TableCell>{row.id_number}</TableCell>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.active_roles}</TableCell>
                <TableCell>{row.working_status}</TableCell>
                <TableCell>{row.attendence}</TableCell>
                <TableCell>
                  <Button>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Staff;
