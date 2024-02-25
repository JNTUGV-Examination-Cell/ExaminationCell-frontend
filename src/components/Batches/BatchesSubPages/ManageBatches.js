import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { USER_LEVELS } from "../../../constants/AllConstants";
import { Typography, Box } from "@mui/material";
import UploadAndEdit from "../../useFullCustomComponents/UploadAndEdit";
// import api from "../../apiReference";

const ManageBatches = () => {
  const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userLevel = USER_LEVELS[loginUserDetails.role];
  const [bulkadmissions, setBulkAdmission] = useState(false);
  const [newAdmission, setNewAdmission] = useState(false);
  const location = useLocation();
  const record = location.state?.record;
  // const addStudents = async () => {
  //   try {
  //     const response = await api.post(
  //       "/api/Students/addStudent",
  //       formattedData
  //     );
  //     console.log({ response });
  //     if (response.data.success) {
  //       setUploadStatus(true)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setUploadStatus(error.response.data);
  //   }
  // };
  if (!record) {
    return <div>No data found</div>;
  }

  const renderContent = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Typography variant="h5">
        Manage Batch - {record?.regulation_course_title}
      </Typography>
      <Stack spacing={2} direction="row">
        <Button
          onClick={() => {
            setBulkAdmission(false);
            setNewAdmission(true);
          }}
          variant="contained"
        >
          New Admission
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setBulkAdmission(true);
            setNewAdmission(false);
          }}
        >
          Bulk Admissions
        </Button>
        {userLevel === 1 && <Button variant="contained">Fee Setup</Button>}
      </Stack>
      <Box>
        {bulkadmissions && (
          <>
            <Typography variant="h5">Upload Students</Typography>
            <UploadAndEdit />
          </>
        )}
        {newAdmission && (
          <>
            <Typography variant="h5">Upload New Students</Typography>
            <UploadAndEdit />
          </>
        )}
      </Box>
    </div>
  );

  return <div>{renderContent()}</div>;
};

export default ManageBatches;
