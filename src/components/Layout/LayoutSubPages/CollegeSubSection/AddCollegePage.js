import React, { useState } from 'react';
import { Button, TextField, Typography } from "@mui/material";

const AddCollegePage = () => {
  // State variables to store input values
  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [district, setDistrict] = useState('');
  const [collegeType, setCollegeType] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [collegeStatus, setCollegeStatus] = useState('');

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add your logic here to handle the form submission, for example, make an API call to save the college details
    console.log("College details submitted:", {
      collegeName,
      collegeCode,
      district,
      collegeType,
      postalAddress,
      collegeStatus,
    });

    // Add logic to reset form fields if needed
    // setCollegeName('');
    // setCollegeCode('');
    // setDistrict('');
    // setCollegeType('');
    // setPostalAddress('');
    // setCollegeStatus('');
  };

  return (
    <div>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "20px" }}>
        Add College
      </Typography>

      <form onSubmit={handleFormSubmit}>
        <TextField
          label="College Name"
          variant="outlined"
          fullWidth
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          margin="normal"
        />

        <TextField
          label="College Code"
          variant="outlined"
          fullWidth
          value={collegeCode}
          onChange={(e) => setCollegeCode(e.target.value)}
          margin="normal"
        />

        <TextField
          label="District"
          variant="outlined"
          fullWidth
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          margin="normal"
        />

        <TextField
          label="College Type"
          variant="outlined"
          fullWidth
          value={collegeType}
          onChange={(e) => setCollegeType(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Postal Address"
          variant="outlined"
          fullWidth
          value={postalAddress}
          onChange={(e) => setPostalAddress(e.target.value)}
          margin="normal"
        />

        <TextField
          label="College Status"
          variant="outlined"
          fullWidth
          value={collegeStatus}
          onChange={(e) => setCollegeStatus(e.target.value)}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Add College
        </Button>
      </form>
    </div>
  );
};

export default AddCollegePage;
