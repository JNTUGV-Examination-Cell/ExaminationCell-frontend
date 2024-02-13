import React, { useState, useEffect } from 'react';
import "./BranchesAddEdit.css";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";


function BranchesAddEdit({ mode }) {
  const [formData, setFormData] = useState({
    course: '',
    branch: '',
    branchName: '',
    branchFullName: '',
    branchSpecialization: '',
    branchCode: '',
    branchODCode: '',
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/branch/getCompleteBranches');
        if (response.ok) {
          const data = await response.json();
          setCourses(data.branches); // Assuming your API returns an array of branches
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  // useEffect(() => {
  //   if (courses && courses.length > 0) {
  //     // Once branch data is fetched, update the form data
  //     const firstCourse = courses[0];
  //     setFormData({
  //       course: firstCourse.course,
  //       branch: firstCourse.branch,
  //       branchFullName: firstCourse.branch_full_name,
  //       branchSpecialization: firstCourse.branch_specialization,
  //       branchCode: firstCourse.branch_code,
  //     });
  //   }
  // }, [courses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getHeading = () => {
    if (mode === 'add') {
      return 'Add Branch -CE-';
    } else if (mode === 'edit') {
      return 'Edit Branch -CE-';
    }
    // Add more conditions as needed
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('/api/branch/addBranches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Updated successfully!');
      } else {
        console.error('Failed to add branch. Please try again.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Render courses dropdown
  const renderCoursesDropdown = () => (
    <select
      id='course'
      name='course'
      value={formData.course}
      onChange={handleInputChange}
    >
      <option value='select'>-SELECT-</option>
      {courses.map(course => (
        <option key={course.id} value={course.id}>{course.name}</option>
      ))}
    </select>
  );

  return (
    <div>
      <h1 className='Heading'>{getHeading()}</h1>
      <br />
      <div className='container'>
        <h2 className='page-heading'>{getHeading()}</h2>
        <div className='form-section'>
          <div className='left-section'>
            <div className='form'>
              <label htmlFor='course'>Course:</label>
              <div className='underline-dropdown'>
                {renderCoursesDropdown()}
              </div>
            </div>

          <div className='form'>
            <label htmlFor='branchName'>Branch Name:</label>
            <div className='underline'>
              <input
                type='text'
                id='branchName'
                name='branchName'
                value={formData.branchName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='form'>
            <label htmlFor='branchSpecialization'>Branch Specialization:</label>
            <div className='underline'>
              <input
                type='text'
                id='branchSpecialization'
                name='branchSpecialization'
                value={formData.branchSpecialization}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className='right-section'>
          <div className='form'>
            <label htmlFor='branch'>Branch:</label>
            <div className='underline-dropdown'>
              <select
                id='branch'
                name='branch'
                value={formData.branch}
                onChange={handleInputChange}
              >
                <option value='select'>-SELECT-</option>
              </select>
            </div>
          </div>

          <div className='form'>
            <label htmlFor='branchFullName'>Branch Full Name:</label>
            <div className='underline'>
              <input
                type='text'
                id='branchFullName'
                name='branchFullName'
                value={formData.branchFullName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='form'>
            <label htmlFor='branchCode'>Branch Code:</label>
            <div className='underline'>
              <input
                type='text'
                id='branchCode'
                name='branchCode'
                value={formData.branchCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        </div>
        <div className='middle-section'>
        <div className='form'>
        <div className='BranchODCode1'>
            <label htmlFor='branchODCode'>Branch OD Code:</label>
            <div className='underline-ODCode center-input'>
              <input
                type='text'
                id='branchODCode'
                name='branchODCode'
                value={formData.branchODCode}
                onChange={handleInputChange}
              />
              </div>
            </div>
          </div>
      </div>
      <div className='update-button'>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  height: 30,
                }}
                onClick={handleFormSubmit}
                component={Link}
                to="/layout"
                className="button"
              >
                Update <span>&#8594;</span>
              </Button>
            </Grid>
          </div>
    </div>
   </div>
  );
}

export default BranchesAddEdit;
