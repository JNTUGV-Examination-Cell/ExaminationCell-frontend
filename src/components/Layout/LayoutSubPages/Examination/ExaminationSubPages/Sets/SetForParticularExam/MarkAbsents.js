import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { CSVLink } from "react-csv";
import { v4 as uuidv4 } from 'uuid';
import Papa from "papaparse";
import "./MarkAbsents.css";

function MarkAbsents() {
  const [inputRollNumber, setInputRollNumber] = useState("");
  const [absentees, setAbsentees] = useState([]);
  const [showAbsentees, setShowAbsentees] = useState(false);
  const [absenteeDetails, setAbsenteeDetails] = useState([]);
  const [downloadData, setDownloadData] = useState([]); 
  const [openModal, setOpenModal] = useState(false);
  
  const fetchPersonDetails = async (roll_no) => {
    try {
      const response = await fetch(`http://localhost:9000/api/students/fetchStudentsdataByRollnumber/${roll_no}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error("Failed to fetch student data");
        return null;
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (inputRollNumber.trim() !== "") {
      try {
        const details = await fetchPersonDetails(inputRollNumber);
  
        if (details && details.roll_no) {
          const formattedRollNumber = details.roll_no.toUpperCase();
          const isAlreadyAbsent = absentees.some(item => item["Roll Number"] === formattedRollNumber);
  
          if (isAlreadyAbsent) {
            window.alert("Roll number is already marked as absent.");
          } else {
            const id = uuidv4(); 
            setAbsentees([...absentees, { id, "Roll Number": formattedRollNumber }]);
            setAbsenteeDetails([...absenteeDetails, { id, ...details }]); 
            setInputRollNumber("");
            setShowAbsentees(true); // Set showAbsentees to true after marking absent
            window.alert("Roll number marked as absent.");
          }
        } else {
          window.alert("No details found for the provided roll number.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        window.alert("Failed to fetch student data. Please try again.");
      }
    }
  };
   

  const handleViewAbsentees = () => {
    setShowAbsentees(true); // Set showAbsentees to true to show the absentees
    setOpenModal(true); // Open the modal to show the absentees
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const absenteesButtonText = "Show Absentees";

  const columns = [
    { field: "roll_no", headerName: "Roll Number", width: 150 },
    { field: "student_name", headerName: "Name", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "branch_full_nane", headerName: "Branch", width: 150 },
    { field: "course", headerName: "Course", width: 150 },
  ];

  const handleDownloadAbsentees = () => {
    const dataForDownload = absenteeDetails.map((details, index) => ({
      id: index + 1,
      roll_no: absentees[index]["Roll Number"],
      student_name: details.student_name,
      year: details.year,
      branch_full_nane: details.branch_full_nane,
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
            <br/>
            <Typography style={{ fontSize: "30px", fontWeight: "bold" }}>Absentees for the Slot</Typography>
            <br/>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <br/>
              <Typography htmlFor="roll_noInput"  style={{ fontSize: "18px"}}>Roll Numbers for marking Absent</Typography>
                <div style={{ marginBottom: '12px' }}></div> {/* Add space */}
                <TextField
                  id="roll_noInput"
                  label="Enter Roll Number"
                  variant="outlined"
                  value={inputRollNumber}
                  onChange={(e) => setInputRollNumber(e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
                <div style={{ marginBottom: '5px' }}></div> {/* Add space */}
                <Button type="submit" variant="contained" color="primary">
                  Proceed
                </Button>
                <br/>
                <br/>
              </div>   
            </form>
          </div>
        </div>
      </div>
      <br/>
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