import React, { useState } from "react";
import { Button, Typography, Snackbar } from "@mui/material";
import "./UploadSubjects.css";

const UploadSubjects = ({ onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      return; 
    }

    setUploading(true); 
    setSnackbarOpen(true);
    try {
      await onSubmit(selectedFile);
      setSnackbarOpen(false); 
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false); 
    }
  };

  return (
    <div className="upload-subject-header">
      <Typography variant="h4">Upload Subjects</Typography>
      <div className="upload-sub">
        <Typography variant="h5">Subject Files (.txt format only):</Typography>
        <form onSubmit={handleSubmit} className="form-section">
          <label htmlFor="subjectFileInput">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              id="subjectFileInput"
              style={{ display: "none" }}
            />
            <Button variant="contained" component="span">
              Choose File
            </Button>
            <span style={{ marginLeft: "8px" }}>
              {selectedFile ? `Selected file: ${selectedFile.name}` : "No file chosen"}
            </span>
          </label><br></br>
          <div className="proceed-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedFile || uploading} 
            >
              Proceed<span>&#8594;</span>
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        message="Processing..."
        autoHideDuration={30}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
};

export default UploadSubjects;
