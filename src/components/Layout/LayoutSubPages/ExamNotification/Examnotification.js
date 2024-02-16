import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";

const StyledFormControl = styled(FormControl)({
  marginRight: "20px",
  minWidth: 150,
});

const years = ["2020", "2021", "2022", "2023", "2024"];

function Examnotification() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [collegeCodes, setCollegeCodes] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [showAccordion, setShowAccordion] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [tableData, setTableData] = useState(true);
  const [selectedCollegeCode, setSelectedCollegeCode] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    exam_code: "",
    payment_status: "",
    course: "",
    branch: "",
    year: "",
    fee: "",
    last_date: "",
    late_fee: "",
    late_fee_lastdate: "",
    notification_title: "",
    college_code: "",
  });

  const handleConfirmDialogClose = (confirmed) => {
    setConfirmDialogOpen(false);
    if (confirmed) {
      setShowAccordion(true);
    }
  };

  useEffect(() => {
    const fetchCoursesAndBranches = async () => {
      try {
        const coursesResponse = await fetch(
          "http://localhost:9000/api/examination/fetchCourses"
        );
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        } else {
          console.error("Error fetching courses:", coursesResponse.status);
        }
        const branchesResponse = await fetch(
          "http://localhost:9000/api/examination/fetchBranches"
        );
        if (branchesResponse.ok) {
          const branchesData = await branchesResponse.json();
          setBranches(branchesData);
        } else {
          console.error("Error fetching branches:", branchesResponse.status);
        }
      } catch (error) {
        console.error("Error fetching courses and branches:", error);
      }
    };

    fetchCoursesAndBranches();
  }, []);

  useEffect(() => {
    const fetchCollegeCodes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/examination/fetchCollegecode"
        );

        if (response.status === 200) {
          setCollegeCodes(response.data);
        } else {
          console.error("Error fetching college codes:", response.status);
        }
      } catch (error) {
        console.error("Error fetching college codes:", error);
      }
    };

    fetchCollegeCodes();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:9000/api/examination/addexam_notification",
        [formData]
      );
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      let url =
        "http://localhost:9000/api/examination/fetchAllExam_notifications";

      const queryParams = [];
      if (selectedCollegeCode) {
        queryParams.push(`college_code=${selectedCollegeCode}`);
      }
      if (selectedCourse) {
        queryParams.push(`course=${selectedCourse}`);
      }
      if (selectedBranch) {
        queryParams.push(`branch=${selectedBranch}`);
      }
      if (selectedYear) {
        queryParams.push(`year=${selectedYear}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setTableData(data);
        setShowAccordion(true);
      } else {
        console.error("Error fetching exam data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchAllExamNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/api/examination/fetchAllExam_notifications"
        );
        if (response.ok) {
          const data = await response.json();
          setTableData(data);
          setShowAccordion(true); // Show accordion once data is fetched
        } else {
          console.error("Error fetching exam data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllExamNotifications();
  }, []);

  return (
    <div style={{ marginRight: "10px" }}>
      <StyledFormControl>
        <InputLabel htmlFor="college_code-select">College Code</InputLabel>
        <Select
          value={selectedCollegeCode}
          onChange={(e) => setSelectedCollegeCode(e.target.value)}
          label="College Code"
          inputProps={{
            name: "college_code",
            id: "collegecode-select",
          }}
        >
          <MenuItem>Select</MenuItem>
          {collegeCodes.map((collegeCode, index) => (
            <MenuItem key={index} value={collegeCode}>
              {collegeCode}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
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
          <MenuItem>Select</MenuItem>

          {courses.map((course, index) => (
            <MenuItem key={index} value={course}>
              {course}
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
          <MenuItem>Select</MenuItem>

          {branches.map((branch, index) => (
            <MenuItem key={index} value={branch}>
              {branch}
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
          <MenuItem>Select</MenuItem>

          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          marginRight: "100px",
        }}
        onClick={handleSubmit}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          marginRight: "70px",
        }}
        onClick={handleClickOpen}
      >
        Add Exam Notification
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Exam Notification</DialogTitle>
        <DialogContent>
          <form style={{ minWidth: "500px" }}>
            <br />
            <TextField
              label="Exam Code"
              name="exam_code"
              value={formData.exam_code}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />

            <TextField
              label="Payment Status"
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="fee"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="last date"
              name="last_date"
              value={formData.last_date}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="late fee"
              name="late_fee"
              value={formData.late_fee}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="last date for late fee"
              name="late_fee_lastdate"
              value={formData.late_fee_lastdate}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="Notification title"
              name="notification_title"
              value={formData.notification_title}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label="college"
              name="college_code"
              value={formData.college_code}
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <Button
              onClick={handleAddSubmit}
              color="primary"
              variant="contained"
              style={{ marginLeft: "90px" }}
            >
              Add Notification
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              style={{
                marginLeft: "50px",
                color: "white",
                backgroundColor: "red",
              }}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => handleConfirmDialogClose(false)}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Do you want to submit the details?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleConfirmDialogClose(false)}
            color="primary"
          >
            Cancel
          </Button>
          <br></br>
          <Button
            onClick={() => handleConfirmDialogClose(true)}
            color="primary"
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        <h3>
          {selectedCourse} {selectedBranch} {selectedYear} Exam Notifications
        </h3>
        {showAccordion && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Exam Code</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Fee</TableCell>
                <TableCell>Last Date</TableCell>
                <TableCell>Late Fee</TableCell>
                <TableCell>Late Fee Last Date</TableCell>
                <TableCell>Notification Title</TableCell>
                <TableCell>College</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.exam_code}</TableCell>
                  <TableCell>{item.payment_status}</TableCell>
                  <TableCell>{item.course}</TableCell>
                  <TableCell>{item.branch}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.fee}</TableCell>
                  <TableCell>{item.last_date}</TableCell>
                  <TableCell>{item.late_fee}</TableCell>
                  <TableCell>{item.late_fee_lastdate}</TableCell>
                  <TableCell>{item.notification_title}</TableCell>
                  <TableCell>{item.college_code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Examnotification;
