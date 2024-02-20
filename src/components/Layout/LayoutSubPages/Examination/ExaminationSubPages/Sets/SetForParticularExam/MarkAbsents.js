import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Papa from "papaparse";
import { v4 as uuidv4 } from 'uuid';
import "./MarkAbsents.css";

function MarkAbsents() {
  const [inputRollNumber, setInputRollNumber] = useState("");
  const [absentees, setAbsentees] = useState([]);
  const [showAbsentees, setShowAbsentees] = useState(false);
  const [absenteeDetails, setAbsenteeDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchPersonDetails = async (rollNumber) => {
    try {
      const response = await fetch(`http://localhost:9000/api/examstudents/fetchfaildStudents/${rollNumber}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch details for roll number ${rollNumber}. Status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Response is not in JSON format');
      }
    } catch (error) {
      console.error("Error fetching person details:", error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputRollNumber.trim() !== "") {
      try {
        const details = await fetchPersonDetails(inputRollNumber);
        if (details) {
          const isAlreadyAbsent = absentees.some(
            (item) => item["Roll Number"] === inputRollNumber
          );

          if (isAlreadyAbsent) {
            window.alert("Roll number is already marked as absent.");
          } else {
            const id = uuidv4();
            setAbsentees([...absentees, { id, "Roll Number": inputRollNumber }]);
            setAbsenteeDetails([...absenteeDetails, { id, ...details }]);
            setInputRollNumber("");
            setShowAbsentees(true);
            window.alert("Roll number marked as absent.");
          }
        } else {
          window.alert("No details found for the provided roll number.");
        }
      } catch (error) {
        console.error("Error fetching person details:", error);
        window.alert("An error occurred while fetching person details.");
      }
    }
  };

  const handleViewAbsentees = () => {
    setShowAbsentees(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const absenteesButtonText = "Show Absentees";

  const columns = [
    { field: "rollNumber", headerName: "Roll Number", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "branch", headerName: "Branch", width: 150 },
    { field: "course", headerName: "Course", width: 150 },
  ];

  const handleDownloadAbsentees = () => {
    const dataForDownload = absenteeDetails.map((details, index) => ({
      id: index + 1,
      rollNumber: absentees[index]["Roll Number"],
      name: details.name,
      year: details.year,
      branch: details.branch,
      course: details.course,
    }));

    const csvData = Papa.unparse(dataForDownload, {
      header: true,
      encoding: "utf8",
      skipEmptyLines: true,
      byteOrderMark: false,
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "absentees.csv";

    downloadLink.click();
  };

  return (
    <div>
      <div>
        <h1>Mark Absent - R111223 - B.Tech I Year I Sem R20 Reg February 2023 - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM</h1>
      </div>
      <br />
      <div className="set" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="set5" style={{ textAlign: 'center', height: 'auto' }}>
          <div>
            <h2>Absentees for the Slot</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="rollNumberInput">Roll Numbers for marking Absent</label>
                <div style={{ marginBottom: '12px' }}></div>
                <TextField
                  id="rollNumberInput"
                  label="Enter Roll Number"
                  variant="outlined"
                  value={inputRollNumber}
                  onChange={(e) => setInputRollNumber(e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
                <div style={{ marginBottom: '5px' }}></div>
                <Button type="submit" variant="contained" color="primary">
                  Proceed
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleViewAbsentees}>
            {absenteesButtonText}
          </Button>
          <div style={{ width: '50px' }}></div>
          <Button variant="contained" color="primary" onClick={handleDownloadAbsentees}>
            Download Absentees
          </Button>
        </div>
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
          <DialogTitle>Absentees</DialogTitle>
          <DialogContent>
            <div style={{ height: '100%', width: '100%' }}>
              {showAbsentees && (
                <DataGrid
                  rows={absenteeDetails}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                />
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="contained" color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MarkAbsents;
