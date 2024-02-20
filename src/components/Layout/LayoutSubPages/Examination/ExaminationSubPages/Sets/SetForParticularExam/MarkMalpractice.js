import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { CSVLink } from "react-csv";
import personDetails from "./personDetails";
import { v4 as uuidv4 } from 'uuid';
import Papa from "papaparse";
import "./MarkMalpractice.css";

function MarkMalpractice() {
  const [inputRollNumber, setInputRollNumber] = useState("");
  const [malpractice, setMalpractice] = useState([]);
  const [showMalpractice, setShowMalpractice] = useState(false);
  const [malpracticeDetails, setMalpracticeDetails] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchPersonDetails = (rollNumber) => {
    const rollNumberLowerCase = rollNumber.toLowerCase();
    return personDetails.find((person) => person.rollNumber.toLowerCase() === rollNumberLowerCase);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputRollNumber.trim() !== "") {
      const details = fetchPersonDetails(inputRollNumber);
      const formattedRollNumber = details ? details.rollNumber : inputRollNumber.toUpperCase();
      const isAlreadyMalpractice = malpractice.some(item => item["Roll Number"] === formattedRollNumber);

      if (isAlreadyMalpractice) {
        window.alert("Roll number is already marked as malpractice.");
      } else if (details) {
        const id = uuidv4(); 
        setMalpractice([...malpractice, { id, "Roll Number": formattedRollNumber }]);
        setMalpracticeDetails([...malpracticeDetails, { id, ...details }]); 
        setInputRollNumber("");
        setShowMalpractice(true);
        window.alert("Roll number marked as malpractice.");
      } else {
        window.alert("No details found for the provided roll number.");
      }
    }
  };

 

  const handleViewMalpractice = () => {
    setShowMalpractice(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const MalpracticeButtonText = "Show Malpractice";

  const columns = [
    { field: "rollNumber", headerName: "Roll Number", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "branch", headerName: "Branch", width: 150 },
    { field: "course", headerName: "Course", width: 150 },
  ];

  const handleDownloadMalpractice = () => {
    const dataForDownload = malpracticeDetails.map((details, index) => ({
      id: index + 1,
      rollNumber: malpractice[index]["Roll Number"],
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
    downloadLink.download = "malpractice.csv";

    downloadLink.click();
  };

  return (
    <div>
      <div>
        <h1>Mark Malpractice - R111223 - B.Tech I Year I Sem R20 Reg February 2023 - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM</h1>
      </div>
      <br />
      <div className="set" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="set5" style={{ textAlign: 'center', height: 'auto' }}>
          <div>
            <h2>Malpractice for the Slot</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="rollNumberInput">Roll Numbers for marking Malpractice</label>
                <div style={{ marginBottom: '12px' }}></div> {/* Add space */}
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

      <br/>

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleViewMalpractice}>
            {MalpracticeButtonText}
          </Button>

          <div style={{ width: '50px' }}></div>

          <Button variant="contained" color="primary" onClick={handleDownloadMalpractice}>
            Download Malpractice
          </Button>
        </div>
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="md">
          <DialogTitle>Malpractice</DialogTitle>
          <DialogContent>
            <div style={{ height: '100%', width: '100%' }}>
              {showMalpractice && (
                <DataGrid
                  rows={malpracticeDetails}
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

export default MarkMalpractice;
