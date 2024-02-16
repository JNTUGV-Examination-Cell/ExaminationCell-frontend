import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, MenuItem } from "@mui/material";
// import { useHistory } from "react-router-dom";

const BranchesAddEdit = ({ branchData, onSubmit }) => {
  const [formData, setFormData] = useState({
    course: "",
    branch: "",
    branchName: "",
    branchFullName: "",
    branchSpecialization: "",
    branchCode: "",
    branchOdCode: ""
  });
  // const history = useHistory();

  useEffect(() => {
    if (branchData) {
      setFormData(branchData);
    }
  }, [branchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData).then(() => {
      // history.push("/branches"); // Redirect to branches page after submission
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">
        {branchData ? "Edit Branch" : "Add Branch"}
      </Typography>
      <TextField
        label="Course"
        name="course"
        value={formData.course}
        onChange={handleChange}
        fullWidth
        required
        select
        variant="outlined"
      >
        {/* Replace the options below with your actual list of courses */}
        <MenuItem value="Course1">Course 1</MenuItem>
        <MenuItem value="Course2">Course 2</MenuItem>
      </TextField>
      <TextField
        label="Branch"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Branch Name"
        name="branchName"
        value={formData.branchName}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Branch Full Name"
        name="branchFullName"
        value={formData.branchFullName}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Branch Specialization"
        name="branchSpecialization"
        value={formData.branchSpecialization}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Branch Code"
        name="branchCode"
        value={formData.branchCode}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Branch Od Code"
        name="branchOdCode"
        value={formData.branchOdCode}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        {branchData ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default BranchesAddEdit;
