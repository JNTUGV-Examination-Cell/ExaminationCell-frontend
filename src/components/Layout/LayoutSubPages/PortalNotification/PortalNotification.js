import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import PortalData from "./PortalData";

const PortalNotification = () => {
  const jsonData = PortalData;
  return (
    <Box>
      Portal Notification
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl.No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notfication Date</TableCell>
              <TableCell>File</TableCell>
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
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.Title}</TableCell>
                <TableCell>{row.Status}</TableCell>
                <TableCell>{row.Notification_Date}</TableCell>
                <TableCell>
                  <Button href={row.File}>Download</Button>
                </TableCell>
                <TableCell>
                  <Button href={row.Action}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PortalNotification;
