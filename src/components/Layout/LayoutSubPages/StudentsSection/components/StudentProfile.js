import React from "react";
import {
  Typography,
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExamDetailsGrid from "./ExamDetailsGrid";
import { attendedExamsColumns, eligibleExamsColumns } from "./constants";
import { useParams } from "react-router-dom";
import CertificatesOfStudent from "./CertificatesOfStudent";

function StudentProfile() {
  const { studentId } = useParams();

  const studentDetails = {
    studentName: "Name of studnet",
    rollNumber: studentId,
    email: "<EMAIL>",
    gender: "Male",
    college: "University",
    branch: "IT",
    eligibleExams: [
      {
        id: 1,
        exam: "Chemistry Final",
        exam_code: "CHEM303",
        batch: "Batch C",
        semester: "Summer",
        examtype: "Final",
        any: "Other data",
        month: "June",
        year: 2024,
        Type: "Type C",
      },
      {
        id: 2,
        exam: "Biology Midterm",
        exam_code: "BIO101",
        batch: "Batch D",
        semester: "Winter",
        examtype: "Midterm",
        any: "More data",
        month: "December",
        year: 2024,
        Type: "Type D",
      },
    ],
    attendedExams: [
      {
        id: 1,
        exam: "Math Final",
        exam_code: "MATH101",
        batch: "Batch A",
        semester: "Spring",
        examtype: "Final",
        any: "Any data",
        month: "March",
        year: 2023,
        Type: "Type A",
      },
      {
        id: 2,
        exam: "Physics Midterm",
        exam_code: "PHY202",
        batch: "Batch B",
        semester: "Fall",
        examtype: "Midterm",
        any: "Some data",
        month: "October",
        year: 2023,
        Type: "Type B",
      },
    ],
  };
  const attendedExamsData = studentDetails.eligibleExams;

  const eligibleExamsData = studentDetails.attendedExams;

  const screenWidth = window.innerWidth;
  const updatedWidth = screenWidth - (35 * screenWidth) / 100;
  console.log(screenWidth);

  return (
    <Box
      sx={{
        width: `${updatedWidth}px`,
        typography: "body1",
        paddingLeft: `${screenWidth - (92 * screenWidth) / 100}px`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5">John Doe</Typography>
          <Typography variant="h5">{studentId}</Typography>
        </Box>
        <Avatar sx={{ width: 100, height: 100, mr: 2 }}>N</Avatar>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          justifyContent: "space-between",
        }}
      >
        <Typography>College: XYZ University</Typography>
        <Typography>Course: B.Tech</Typography>
        <Typography>Branch: Computer Science</Typography>
      </Box>
      <CertificatesOfStudent
        styles={{
          marginBottom: "30px",
          marginTop: "30px",
          display: "flex",
          justifyContent: "end",
        }}
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Eligible Exams</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ExamDetailsGrid
            rows={eligibleExamsData}
            columns={eligibleExamsColumns}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Attended Exams</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ExamDetailsGrid
            rows={attendedExamsData}
            columns={attendedExamsColumns}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default StudentProfile;
