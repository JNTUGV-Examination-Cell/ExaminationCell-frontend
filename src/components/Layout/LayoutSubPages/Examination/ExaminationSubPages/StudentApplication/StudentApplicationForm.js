import React, { useState,useEffect } from "react";import './StudentApplicationForm.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { selectCurrentExam } from '../../../../../../features/exams/examSlice';

const jsonData = [
  { branch: 'EEE', total_students: '87', registered: '85', not_registered: '2' },
  { branch: 'ECE', total_students: '87', registered: '85', not_registered: '2' },
  { branch: 'CSE', total_students: '87', registered: '85', not_registered: '2' },
  { branch: 'IT', total_students: '87', registered: '85', not_registered: '2' }
];

jsonData.forEach((item, index) => {
  item.serialNumber = index + 1;
});

const Studentslist = [
    { hallticket:'22NM1A4416',name:'GUNTI SUPRIYA',branch:'CSE-DS',mobile:'8897785765',id:'8187301444',registration:'Registered' },
    { hallticket:'21NM1A4416',name:'GUNTI SUPRIYA',branch:'CSE-DS',mobile:'8897785765',id:'8187301444',registration:'Not Registered' },
    { hallticket:'22NM1A4416',name:'GUNTI SUPRIYA',branch:'CSE-DS',mobile:'8897785765',id:'8187301444',registration:'Registered' },
    { hallticket:'22NM1A4416',name:'GUNTI SUPRIYA',branch:'CSE-DS',mobile:'8897785765',id:'8187301444',registration:'Not Registered' }
];
Studentslist.forEach((item, index) => {
  item.serialNumber = index + 1;
});

const StudentApplicationForm = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(Studentslist);
    const [filterStatus, setFilterStatus] = useState("All");
    const [totalAmount, setTotalAmount] = useState(0);
    console.log({});
  useEffect(() => {
    const amountPerStudent = 560;
    const totalAmount = amountPerStudent * filteredData.length;
    setTotalAmount(totalAmount);
  }, [filteredData]);

    const handleSearchChange = (event) => {
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);

      const filtered = Studentslist.filter((item) =>
        (filterStatus === "All" || item.registration === filterStatus) &&
        (item.name.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
          item.hallticket.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
          item.mobile.toLowerCase().includes(newSearchTerm.toLowerCase()))
      );
  
      setFilteredData(filtered);
    };
  
    const handleFilter = (status) => {
      setFilterStatus(status);
      
      const filtered = Studentslist.filter((item) =>
        (status === "All" || item.registration === status) &&
        (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.hallticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mobile.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  
      setFilteredData(filtered);
    };
    const handleDownloadStudentList = () => {

        const csvData = filteredData.map((row) =>
          `${row.serialNumber},${row.hallticket},${row.name},${row.branch},${row.mobile},${row.id},${row.registration}`
        );

        const csvContent = `SI no,Hallticket,Name,Branch,Mobile,Id,Registration\n${csvData.join("\n")}`;

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", "student_list.csv");
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      const registeredStudentsCount = Studentslist.filter(
        (student) => student.registration === "Registered"
      ).length;
      
      const notRegisteredStudentsCount = Studentslist.filter(
        (student) => student.registration === "Not Registered"
      ).length;
      
      const currentExam = useSelector(selectCurrentExam);

  return (
    <div>
      <div className="header">
        <h1 className="head">Student Exam Application - {currentExam.currentExam} - {currentExam.currentExamName}</h1>
        <Stack spacing={2} direction="row">
          <Button variant="contained">Download Application Form</Button>
          <Button variant="contained">Payment</Button>
        </Stack>
      </div>
      <div className="ApplicationDetails">
        <h1>Application Details</h1>
        <span style={{color:"blue"}}>[Published]</span>
        <h2>Last date of the application is 28 January 2023 11:00 PM</h2>
        <p>Type: Paid &emsp; &emsp; Collect: Exam Based &emsp; &emsp; University Exam Fees: <CurrencyRupeeIcon fontSize="small"/>560</p>
        <hr size="1" width="90%" color="black"></hr>
        <hr size="1" width="90%" color="black"></hr>
        <p>Late Fees</p>
        <p>100 &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; 30 January 2023 11:00 PM</p>
        <p>1000 &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;31 January 2023 11:00 PM</p>
        <hr size="1" width="90%" color="black"></hr>
      </div>
      <div className="branchtable">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>SI no</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Total Students</TableCell>
                <TableCell>Registered</TableCell>
                <TableCell>Not Registered</TableCell>
                <TableCell>Application Form</TableCell>
                <TableCell>Hallticket</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jsonData.map((row) => (
                <TableRow
                  key={row.serialNumber}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.serialNumber}
                  </TableCell>
                  <TableCell>{row.branch}</TableCell>
                  <TableCell>{row.total_students}</TableCell>
                  <TableCell>{row.registered}</TableCell>
                  <TableCell>{row.not_registered}</TableCell>
                  <TableCell>
                    <Button variant="contained">Download</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained">Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="IconsHead">
        <Stack spacing={2} direction="row">
        <div className="Uni_Amount">
        <CurrencyRupeeIcon fontSize="large" />
        <p>Total University Amount</p>
        <h1>{totalAmount}</h1>
      </div>
          <div className="registered_students">
            <GroupsIcon fontSize="large" />
            <p>Registered Students</p>
            <h1>{registeredStudentsCount}</h1>
          </div>
          <div className="not_registered_students">
            <PersonOffIcon fontSize="large" />
            <p>Not Registered Students</p>
            <h1>{notRegisteredStudentsCount}</h1>
          </div>
        </Stack>
        <div className="Students_Applied">
          <h1>List of Students applied</h1>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            style={{margin:15}}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="search by Hallticket/Name/Mobile.no/Id"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "grey.500" }} />
                ),
              }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Stack spacing={2} direction="row" style={{ margin: 10, textAlign: "left" }}>
        <p>Filter :</p>
        <Button
          variant={filterStatus === "Registered" ? "contained" : "outlined"}
          onClick={() => handleFilter("Registered")}
        >
          Registered
        </Button>
        <Button
          variant={filterStatus === "Not Registered" ? "contained" : "outlined"}
          onClick={() => handleFilter("Not Registered")}
        >
          Not Registered
        </Button>
      </Stack>
      <Stack spacing={2} direction="row" style={{ margin: 5, textAlign: "left" }}>
        <p>Download :</p>
        <Button variant="contained" onClick={handleDownloadStudentList}>
          Student List
        </Button>
        <Button variant="contained">Subject Registration List</Button>
      </Stack>
          <TableContainer component={Paper} className="table2">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SI no</TableCell>
                  <TableCell>Hallticket</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Registration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow
                    key={row.serialNumber}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.serialNumber}
                    </TableCell>
                    <TableCell>{row.hallticket}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.branch}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.registration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default StudentApplicationForm;
