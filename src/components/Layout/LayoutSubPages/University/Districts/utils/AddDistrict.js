import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import api from "../../../../../apiReference";

const AddDistrict = ({ open, handleClose, text, districtsData }) => {
  const [districtName, setDistrictName] = useState("");
  const [districtSlug, setDistrictSlug] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleSave = async () => {
    const newDistrictId = districtsData.length + 1;

    try {
      const response = await api.post("/api/district/addDistricts", {
        district_id: newDistrictId,
        district_name: districtName,
        district_slug: districtSlug,
      });
      console.log("District saved:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error saving district:", error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {text} District
        </Typography>
        <form>
          <TextField
            label="District Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
          />
          <TextField
            label="District Slug"
            variant="outlined"
            fullWidth
            margin="normal"
            value={districtSlug}
            onChange={(e) => setDistrictSlug(e.target.value)}
          />
        </form>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddDistrict;
