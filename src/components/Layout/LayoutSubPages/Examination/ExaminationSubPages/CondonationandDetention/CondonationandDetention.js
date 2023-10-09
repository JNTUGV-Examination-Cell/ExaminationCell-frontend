import React, { useState } from "react";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./CondonationandDetention.css";

const jsonData = [
  { Slno: 1, Hallticket: "22NM1A0202" },
  { Slno: 2, Hallticket: "22NM1A0234" },
  { Slno: 3, Hallticket: "22NM1A0478" },
  { Slno: 4, Hallticket: "22NM1A04E9" },
  { Slno: 5, Hallticket: "22NM1A04F7" },
];

const jsonData1 = [{ Slno: 1, Hallticket: "22NM1A0267", Amount: 500 }];

function CondonationandDetention() {
  const [isPaymentFormVisible, setPaymentFormVisible] = useState(false);
  const handleSettingsClick = () => {
    setPaymentFormVisible(!isPaymentFormVisible);
  };
  const [presentExam] = useState("R111223 - B.Tech I Year I Sem R20 Reg February 2023");
  // setCurrentExam("");
  return (
    <div className="set">
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h4">
          Condonation and Detention - {presentExam}
        </Typography>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <Button
          onClick={handleSettingsClick}
          variant="contained"
          color="primary"
        >
          Payment
        </Button>
      </div>

      {isPaymentFormVisible && (
        <div>
          {/* Render your payment form or payment processing logic here */}
        </div>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="Detained">
            <Typography variant="h5">Detained Students</Typography>
            <Paper elevation={3} className="table-container">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-cell">Sl no</TableCell>
                      <TableCell className="table-cell">Hallticket</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jsonData.map((user, index) => (
                      <TableRow
                        key={user.Slno}
                        className={`table-row ${
                          index % 2 === 0 ? "even-row" : ""
                        } hover-row`}
                      >
                        <TableCell className="table-cell">
                          {user.Slno}
                        </TableCell>
                        <TableCell className="table-cell">
                          {user.Hallticket}
                        </TableCell>
                      </TableRow>
                    ))}
                    {jsonData.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2}>
                          No matching records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="Condonation">
            <Typography variant="h5">Condonation Students</Typography>
            {jsonData1.length > 0 ? (
              <Paper elevation={3} className="table-container">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="table-cell">Sl no</TableCell>
                        <TableCell className="table-cell">Hallticket</TableCell>
                        <TableCell className="table-cell">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jsonData1.map((user, index) => (
                        <TableRow
                          key={user.Slno}
                          className={`table-row ${
                            index % 2 === 0 ? "even-row" : ""
                          } hover-row separator-line`}
                        >
                          <TableCell className="table-cell">
                            {user.Slno}
                          </TableCell>
                          <TableCell className="table-cell">
                            {user.Hallticket}
                          </TableCell>
                          <TableCell className="table-cell">
                            {user.Amount}
                          </TableCell>
                        </TableRow>
                      ))}
                      {jsonData1.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3}>
                            No matching records found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            ) : (
              <Typography variant="body1">
                No condonation students data available
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CondonationandDetention;
