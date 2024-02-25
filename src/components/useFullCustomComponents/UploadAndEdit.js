import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Box, Typography, Grid, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useDropzone } from "react-dropzone";

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

function validateEmail(email) {
  const emailRegex =
  /^[\w!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(String(email).toLowerCase());
}

function validateRow({ name, number, email }) {
  let errors = {};
  if (!name || /[^a-zA-Z ]/g.test(name)) {
    errors.name = "Invalid name; only characters are allowed.";
  }
  if (!number || !/^(\d{10})$/.test(number)) {
    errors.number = "Invalid number; should be 10 digits only.";
  }
  if (!email || !validateEmail(email)) {
    errors.email = "Invalid email format.";
  }
  return errors;
}

function UploadAndEdit({ openUpload, setOpenUpload }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpenUpload(true);
  const handleClose = () => setOpenUpload(false);

  useEffect(() => {
    if (rows.length > 0) {
      setOpenUpload(false);
    }
  }, [rows, setOpenUpload]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileType = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        let data = e.target.result;
        let errors = {};
        if (fileType.includes("spreadsheetml")) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        } else {
          data = Papa.parse(data, { header: true, skipEmptyLines: true }).data;
        }
        const validatedData = data.map((row, index) => {
          const rowErrors = validateRow(row);
          if (Object.keys(rowErrors).length > 0) {
            errors[index + 1] = rowErrors;
          }
          return {
            id: row["SI no"] || index,
            ...row,
          };
        });
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
        } else {
          setRows(validatedData);
          const columns = Object.keys(validatedData[0])
            .map((key) => ({
              field: key,
              headerName: key.charAt(0).toUpperCase() + key.slice(1),
              width: 150,
              editable: true,
            }))
            .filter((column) => column.field !== "id");
          setColumns(columns);
        }
      };
      if (fileType.includes("spreadsheetml")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const handleSave = () => {
    console.log(JSON.stringify(rows));
    // Here you would also handle sending the data to the backend if no errors
  };

  return (
    <div>
      <Button onClick={handleOpen}>Upload Data</Button>
      <Modal
        open={openUpload}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Student Data
          </Typography>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #000",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          {Object.keys(errors).length > 0 && (
            <Alert severity="error">
              There are validation errors in rows:{" "}
              {Object.keys(errors).join(", ")}. Please correct them and try
              again.
            </Alert>
          )}
        </Box>
      </Modal>
      {rows.length > 0 && (
        <div style={{ height: 400, width: "100%" }}>
          <Grid
            container
            justifyContent="flex-end"
            style={{ marginBottom: "10px" }}
          >
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Grid>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row) => row.id}
          />
        </div>
      )}
    </div>
  );
}

export default UploadAndEdit;
