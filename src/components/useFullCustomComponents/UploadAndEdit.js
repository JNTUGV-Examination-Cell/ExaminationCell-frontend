import React, { useCallback, useState } from 'react';
import { Button, Modal, Box, Typography, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UploadAndEdit() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileType = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        let data = e.target.result;
        if (fileType.includes('spreadsheetml')) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        } else {
          data = Papa.parse(data, { header: true, skipEmptyLines: true }).data;
        }
        data = data.map((row, index) => ({ id: row["SI no"] || index, ...row }));
        const columns = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
          editable: true,
        })).filter(column => column.field !== 'id');
        setRows(data);
        setColumns(columns);
      };
      if (fileType.includes('spreadsheetml')) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsText(file);
      }
    }
  }, []);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

  const handleSave = () => {
    console.log(JSON.stringify(rows));
  };

  return (
    <div>
      <Button onClick={handleOpen}>Upload Data</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Student Data
          </Typography>
          <div {...getRootProps()} style={{ border: '2px dashed #000', padding: '20px', cursor: 'pointer' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </Box>
      </Modal>
      {rows.length > 0 && (
        <div style={{ height: 400, width: '100%' }}>
          <Grid container justifyContent="flex-end" style={{ marginBottom: '10px' }}>
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