import React, { useState } from "react";
import "./SetForParticularExam.css";
import { Typography, Button, Grid, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

function SetForParticularExam() {
  const setstitle =
    "Sets - R111223 - B.Tech I Year I sem R20 Reg February 2023 - R201102 - COMMUNICATIVE ENGLISH - 20 February 2023 10:00 AM";
  const set = "SET-1";

  const [uploadedFile, setUploadedFile] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [uploadInProgress, setUploadInProgress] = useState(false); 

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setUploadInProgress(true); 
      setUploadedFile(selectedFile);
      setTimeout(() => {
        setUploadInProgress(false); 
      }, 3000); 
    }
  };

  const handleDownload = () => {
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      const downloadLink = document.createElement("a");
      downloadLink.href = fileUrl;
      downloadLink.download = uploadedFile.name;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.log("No file uploaded to download.");
    }
  };

  const handlePublish = () => {
    if (uploadedFile) {
      setShowDownloadButton(true);
    } else {
      console.log("No file uploaded to publish.");
    }
  };

  return (
    <div className="malpractice">
      <Typography variant="h5" className="head">
        {setstitle}
      </Typography>
      <Grid container spacing={2} className="buttons">
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout"
          >
            Sets Allocation
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout/markabsent"
          >
            Mark Absent
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout/markmalpractice"
          >
            Mark MalPractice
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout"
          >
            Download D Form
          </Button>
        </Grid>
      </Grid>
      <div className="setblock">
        <Typography variant="h6" className="set">
          {set}
        </Typography>
        <hr style={{ width: "50%" }}></hr>
        <Typography variant="h6" className="ntable">
          {showDownloadButton ? (
            <span style={{ color: "green" }}>Available</span>
          ) : (
            "Not Available"
          )}
        </Typography>
        <hr style={{ width: "50%" }}></hr>
        <Grid container spacing={2} className="center-buttons">
          <Grid item>
            <label htmlFor="file-upload" style={{ display: "block" }}>
              <Button
                variant="contained"
                style={{
                  height: 30,
                }}
                component="span"
              >
                Upload
              </Button>
            </label>
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              accept=".pdf"
              onChange={handleFileUpload}
            />
          </Grid>
          <Grid item>
            {showDownloadButton ? (
              <Button
                variant="contained"
                style={{
                  height: 30,
                }}
                onClick={handleDownload}
              >
                Download
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  height: 30,
                }}
                onClick={handlePublish}
              >
                Publish
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
      <Snackbar
        open={uploadInProgress} 
        autoHideDuration={3000}
        message="File upload in progress..."
      />
    </div>
  );
}

export default SetForParticularExam;
