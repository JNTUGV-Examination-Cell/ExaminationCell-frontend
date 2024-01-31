import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { USER_LEVELS } from "../../../constants/AllConstants";
import { Typography } from "@mui/material";

const ManageBatches = ({batch_id, regulation_course_title}) => {
  const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userLevel = USER_LEVELS[loginUserDetails.role];
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h5">Manage Batch - {regulation_course_title}</Typography>
        <Stack spacing={2} direction="row">
          <Button variant="contained">New Admission</Button>
          <Link to="/layout/batches/managebatches/uploadstudents">
            <Button variant="contained">Bulk Admissions</Button>
          </Link>
          {userLevel === 1 && <Button variant="contained">Fee Setup</Button>}
        </Stack>
      </div>
    </div>
  );
};

export default ManageBatches;
