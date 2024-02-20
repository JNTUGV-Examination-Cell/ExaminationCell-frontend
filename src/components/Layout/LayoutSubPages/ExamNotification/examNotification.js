import React, { useState } from "react";
import { Typography, Button, FormControl, InputLabel, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Table,TableCell,TableBody,TableHead, TableRow} from '@mui/material';

const StyledFormControl = styled(FormControl)({
  marginRight: "30px",
  minWidth: 120,
});

function ExamNotification() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedRegulation, setSelectedRegulation] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [showAccordion, setShowAccordion] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Sample data for courses, regulations, and years
  const courses = ['Btech', 'MBA', 'MCA'];
  const regulations = ['R19', 'R16', 'R20'];
  const years = ['2020', '2021', '2022', '2024'];
  const branches = ['CSE', 'ECE', 'IT', 'EEE'];
  const subjectsRegular=["CE",'IoT','DL'];
  const subjectcodeRegular=['R2011COO2','R20CEOOA','R201OOca'];
  const subjectsSupply =['ML','ADS','JAVA'];
  const subjectCodeSupply=['R201002A','R201100B','R201OOCE']


  const handleSubmit = () => {
    if (selectedCourse && selectedRegulation && selectedYear && selectedBranch) {
      setConfirmDialogOpen(true);
    } else {
      alert("Please fill in all required details.");
    }
  };

  const handleConfirmDialogClose = (confirmed) => {
    setConfirmDialogOpen(false);
    if (confirmed) {
      setShowAccordion(true);
    }
  };

  return (
    <div style={{ marginRight: "10px" }}>
      <StyledFormControl>
        <InputLabel htmlFor="course-select">Course</InputLabel>
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          label="Course"
          inputProps={{
            name: "course",
            id: "course-select",
          }}
        >
          {courses.map((course, index) => (
            <MenuItem key={index} value={course}>
              {course}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <InputLabel htmlFor="regulation-select">Regulation</InputLabel>
        <Select
          value={selectedRegulation}
          onChange={(e) => setSelectedRegulation(e.target.value)}
          label="Regulation"
          inputProps={{
            name: "regulation",
            id: "regulation-select",
          }}
        >
          {regulations.map((regulation, index) => (
            <MenuItem key={index} value={regulation}>
              {regulation}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <InputLabel htmlFor="year-select">Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          label="Year"
          inputProps={{
            name: "year",
            id: "year-select",
          }}
        >
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <StyledFormControl>
        <InputLabel htmlFor="branch-select">Branch</InputLabel>
        <Select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          label="Branch"
          inputProps={{
            name: "branch",
            id: "branch-select",
          }}
        >
          {branches.map((branch, index) => (
            <MenuItem key={index} value={branch}>
              {branch}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <Button variant="contained" color="primary" style={{ marginTop: "10px" }} onClick={handleSubmit}>
        Submit
      </Button>

      <Dialog open={confirmDialogOpen} onClose={() => handleConfirmDialogClose(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Do you want to submit the details?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmDialogClose(true)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {showAccordion && (
        <div>
          <h3>{selectedCourse} {selectedRegulation} {selectedYear} {selectedBranch} Exam Notifications</h3>
          <Accordion style={{ marginTop: '20px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Regular</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject Code</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate over the list of subjects and create rows */}
                  {subjectsRegular.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{subject}</TableCell>
                      <TableCell>{subjectcodeRegular[index]}</TableCell>
                      <TableCell>
                        {/* Link to a new page on the "View" button click */}
                        <Link to={`/view/${subject}`} style={{ textDecoration: 'none' }}>

                          <Button variant="outlined" color="primary">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          <Accordion style={{ marginTop: '20px' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Supply</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Subject Code</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Iterate over the list of subjects and create rows */}
                  {subjectsSupply.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{subject}</TableCell>
                      <TableCell>{subjectCodeSupply[index]}</TableCell>

                      <TableCell>
                        {/* Link to a new page on the "View" button click */}
                        <Link to={`/view/${subject}`} style={{ textDecoration: 'none' }}>

                          <Button variant="outlined" color="primary">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
}

export default ExamNotification;