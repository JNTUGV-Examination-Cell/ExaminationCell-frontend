import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Typography,
  Button,
  Paper,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const StyledPaper = styled(Paper)({
  margin: (theme) => theme.spacing(2),
});

const Examnotification = () => {
  const [tableData, setTableData] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [formData, setFormData] = useState({
    notification_id: "",
    date: "",
    payment_status: "",
    course: "",
    branch: "",
    course_year: "",
    exam_year: "",
    exam_month: "",
    exam_date: "",
    type: "",
    fee: "",
    last_date: "",
    late_fee: "",
    late_fee_lastdate: "",
    notification_title: "",
  });
  const [filters, setFilters] = useState({
    course: "",
    branch: "",
    type: "",
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let filteredResult = tableData;

      if (filters.course) {
        filteredResult = filteredResult.filter(
          (item) => item.course === filters.course
        );
      }

      if (filters.branch) {
        filteredResult = filteredResult.filter(
          (item) => item.branch === filters.branch
        );
      }

      if (filters.type) {
        filteredResult = filteredResult.filter(
          (item) => item.type === filters.type
        );
      }

      setFilteredData(filteredResult);
    };

    applyFilters();
  }, [filters, tableData]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;

    if (/^\d+$/.test(value) || value === "") {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/course/getCompleteCourses"
        );
        if (response.status === 200) {
          setCourseOptions(
            response.data.map((course) => ({
              label: course.course,
              value: course.course,
            }))
          );
        } else {
          console.error("Error fetching courses:", response.status);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/branch/getCompleteBranches"
        );
        if (response.status === 200) {
          setBranchOptions(
            response.data.map((branch) => ({
              label: branch.branch,
              value: branch.branch,
            }))
          );
        } else {
          console.error("Error fetching branches:", response.status);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchCourses();
    fetchBranches();
  }, []);

  useEffect(() => {
    const fetchAllExamNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/examination/fetchAllExam_notifications"
        );
        if (response.status === 200) {
          setTableData(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching exam data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllExamNotifications();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleAddNotification = async () => {
    try {
      await axios.post(
        "http://localhost:9000/api/examination/addexam_notification",
        [formData]
      );

      handleCloseForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <FormControl
            fullWidth
            margin="normal"
            style={{ marginRight: "20px" }}
          >
            <InputLabel htmlFor="course-filter">Course</InputLabel>
            <Select
              value={filters.course}
              onChange={(e) => handleFilterChange("course", e.target.value)}
              label="Course"
              inputProps={{
                name: "course-filter",
                id: "course-filter",
              }}
              style={{ width: "200px" }}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(tableData.map((item) => item.course))).map(
                (course, index) => (
                  <MenuItem key={index} value={course}>
                    {course}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            style={{ marginRight: "20px" }}
          >
            <InputLabel htmlFor="branch-filter">Branch</InputLabel>
            <Select
              value={filters.branch}
              onChange={(e) => handleFilterChange("branch", e.target.value)}
              label="Branch"
              inputProps={{
                name: "branch-filter",
                id: "branch-filter",
              }}
              style={{ width: "200px" }}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(tableData.map((item) => item.branch))).map(
                (branch, index) => (
                  <MenuItem key={index} value={branch}>
                    {branch}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            style={{ marginRight: "20px" }}
          >
            <InputLabel htmlFor="type-filter">Type</InputLabel>
            <Select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              label="Type"
              inputProps={{
                name: "type-filter",
                id: "type-filter",
              }}
              style={{ width: "200px" }}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from(new Set(tableData.map((item) => item.type))).map(
                (type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenForm}
          style={{
            marginBottom: "10px",
            marginLeft: "350px",
            marginTop: "10px",
          }}
        >
          Add New Notification
        </Button>
      </div>
      <br />
      <StyledPaper elevation={3}>
        {filteredData.length > 0 ? (
          <DataGrid
            rows={filteredData.map((row) => ({
              ...row,
              id: row.notification_id,
            }))}
            columns={[
              {
                field: "notification_id",
                headerName: "Notification ID",
                flex: 1,
              },
              { field: "date", headerName: "Date", flex: 1 },
              {
                field: "payment_status",
                headerName: "Payment Status",
                flex: 1,
              },
              { field: "course", headerName: "Course", flex: 1 },
              { field: "branch", headerName: "Branch", flex: 1 },
              { field: "course_year", headerName: "Course Year", flex: 1 },
              { field: "exam_year", headerName: "Exam Year", flex: 1 },
              { field: "exam_month", headerName: "Exam Month", flex: 1 },
              { field: "exam_date", headerName: "Exam Date", flex: 1 },
              { field: "type", headerName: "Type", flex: 1 },
              { field: "fee", headerName: "Fee", flex: 1 },
              { field: "last_date", headerName: "Last Date", flex: 1 },
              { field: "late_fee", headerName: "Late Fee", flex: 1 },
              {
                field: "late_fee_lastdate",
                headerName: "Late Fee Last Date",
                flex: 1,
              },
              {
                field: "notification_title",
                headerName: "Notification Title",
                flex: 1,
              },
            ]}
            pageSize={10}
          />
        ) : (
          <Typography variant="body1" align="center">
            No data found for the selected filters.
          </Typography>
        )}
      </StyledPaper>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Add New Notification</DialogTitle>
        <DialogContent>
          <form>
            <Typography variant="h6">Payment Status:</Typography>

            <RadioGroup
              row
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
              fullWidth
            >
              <FormControlLabel value="paid" control={<Radio />} label="paid" />
              <FormControlLabel
                value="unpaid"
                control={<Radio />}
                label="unpaid"
              />
            </RadioGroup>
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="course">Course</InputLabel>
              <Select
                value={formData.course}
                onChange={handleChange}
                label="Course"
                inputProps={{
                  name: "course",
                  id: "course",
                }}
              >
                <MenuItem value="">Select Course</MenuItem>
                {courseOptions.map((course, index) => (
                  <MenuItem key={index} value={course.value}>
                    {course.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="branch">Branch</InputLabel>
              <Select
                value={formData.branch}
                onChange={handleChange}
                label="Branch"
                inputProps={{
                  name: "branch",
                  id: "branch",
                }}
              >
                <MenuItem value="">Select Branch</MenuItem>
                {branchOptions.map((branch, index) => (
                  <MenuItem key={index} value={branch.value}>
                    {branch.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Course Year"
              name="course_year"
              value={formData.course_year}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Exam Date"
              type="date"
              name="exam_date"
              value={formData.exam_date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Typography variant="h6">Exam Type:</Typography>
            <RadioGroup
              row
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <FormControlLabel
                value="regular"
                control={<Radio />}
                label="Regular"
              />
              <FormControlLabel
                value="supply"
                control={<Radio />}
                label="Supply"
              />
            </RadioGroup>
            <TextField
              label="Fee"
              type="text"
              name="fee"
              value={formData.fee}
              onChange={handleChangeNumber}
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { pattern: "[0-9]*" },
              }}
            />
            <TextField
              label="Last Date"
              type="date"
              name="last_date"
              value={formData.last_date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Late Fee"
              type="text"
              name="late_fee"
              value={formData.late_fee}
              onChange={handleChangeNumber}
              fullWidth
              margin="normal"
              InputProps={{
                inputProps: { pattern: "[0-9]*" },
              }}
            />

            <TextField
              label="Late Fee Last Date"
              type="date"
              name="late_fee_lastdate"
              value={formData.late_fee_lastdate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Notification Title"
              type="text"
              name="notification_title"
              value={formData.notification_title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleAddNotification}
            color="primary"
            variant="contained"
            style={{ marginLeft: "50px" }}
            fullWidth
          >
            Add
          </Button>
          <Button
            onClick={handleCloseForm}
            variant="contained"
            style={{
              marginRight: "50px",
              marginLeft: "50px",
              color: "white",
              backgroundColor: "red",
            }}
            fullWidth
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Examnotification;
