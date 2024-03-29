import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ExaminationSubPage = () => {
  return (
    <Box>
      <Typography>Manage Examination - </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          // width: "80%",
          // justifyContent: "center",
        }}
      >
        <Button variant="contained" component={Link} to="/layout/examdata/manageexamination/studentexamapplication">
          Student Application
        </Button>
        <Button variant="contained" component={Link} to="/layout/examdata/manageexamination/CondonationandDetention">
          Condonation and Detention
        </Button>
        <Button variant="contained" component={Link} to="/layout/examdata/manageexamination/FinalListOfExamination">
          Final List
        </Button>
        <Button variant="contained" component={Link} to="/layout/examdata/manageexamination/Sets">
          Exam Center Dashboard
        </Button>
        <Button variant="contained" component={Link} to="/layout/examdata/manageexamination/InternalMarks">
          Internal Marks
        </Button>
        <Button variant="contained" component={Link} to="/layout">
          Download Student Wise Result
        </Button>
        <Button variant="contained" component={Link} to="/layout">
          Download Subject Wise Result
        </Button>
      </Box>
    </Box>
  );
};

export default ExaminationSubPage;
