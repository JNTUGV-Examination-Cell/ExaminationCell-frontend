import { Button, Box } from "@mui/material";
import React from "react";

const CertificatesOfStudent = ({ styles }) => {
  return (
    <Box sx={{ ml: "auto", ...styles }}>
      <Button variant="contained" disabled sx={{ mr: 1 }}>
        PC
      </Button>
      <Button variant="contained" disabled sx={{ mr: 1 }}>
        CMM
      </Button>
      <Button variant="contained" disabled sx={{ mr: 1 }}>
        OD
      </Button>
      <Button variant="contained" disabled sx={{ mr: 1 }}>
        Transcript
      </Button>
    </Box>
  );
};

export default CertificatesOfStudent;
