import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const AddCollegePage = () => {
  const [collegeData, setCollegeData] = useState({
    collegeName: '',
    collegeCode: '',
    district: '',
    collegeType: '',
    postalAddress: '',
    collegeStatus: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollegeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of the form data, such as making an API call
    console.log('Submitted data:', collegeData);
    // You can perform further actions like sending data to the server
  };

  return (
    <div>
      <h2>Add College</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="College Name"
          variant="outlined"
          name="collegeName"
          value={collegeData.collegeName}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          label="College Code"
          variant="outlined"
          name="collegeCode"
          value={collegeData.collegeCode}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          label="District"
          variant="outlined"
          name="district"
          value={collegeData.district}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          label="College Type"
          variant="outlined"
          name="collegeType"
          value={collegeData.collegeType}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          label="Postal Address"
          variant="outlined"
          name="postalAddress"
          value={collegeData.postalAddress}
          onChange={handleChange}
          required
        />
        <br />
        <TextField
          label="College Status"
          variant="outlined"
          name="collegeStatus"
          value={collegeData.collegeStatus}
          onChange={handleChange}
          required
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddCollegePage;
