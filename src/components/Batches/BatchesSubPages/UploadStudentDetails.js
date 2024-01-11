import * as React from 'react';
import './bulkadmissions.css';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadStudentDetails() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [sheetData, setSheetData] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setSheetData(sheetData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <div>
        <h2>Upload Student basic details - step one - MCA R16 [2018-2021]</h2>
        <br />
        <div className="bulkadmissionsupload">
          <h2 className="head">Upload Student Basic Details File - .xls, .xlsx format</h2>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept=".xls, .xlsx"
              aria-label="Upload file"
            />
          </Button>
          <input
            type="text"
            id="filled-basic"
            placeholder={selectedFile ? selectedFile.name : 'No file chosen'}
            variant="outlined"
            className="textchoose"
            readOnly
          />
          <div className="buttonproceed">
            <Button variant="contained">Proceed</Button>
          </div>
          <br />
          <div className="textshow">
            <textarea
              id="filled-choosen"
              placeholder="Shows the data of the file"
              className="textfill"
              readOnly
              value={JSON.stringify(sheetData, null, 2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
