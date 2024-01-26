import React, { useState } from "react";
import "./bulkadmissions.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as XLSX from "xlsx";
import api from "../../apiReference";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadStudentDetails() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sheetData, setSheetData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
      });
      const isValidData = validateData(sheetData);
      if (isValidData) {
        setSheetData(sheetData);
        setError(null);
      } else {
        setSheetData(null);
        setError("Invalid or duplicate values found in the file.");
      }
    };
    reader.readAsBinaryString(file);
  };
  const formattedData = sheetData?.slice(1).map((row) => {
    return {
      student_college_code: row[1],
      student_batch_id: row[2],
      roll_no: row[3],
      student_name: row[4],
      student_image: row[5],
      branch_id: row[6],
      mobile: row[7],
      email: row[8],
    };
  });

  const addStudents = async () => {
    try {
      const response = await api.post(
        "/api/Students/addStudent",
        formattedData
      );
      console.log({ response });
      if (response.data.success) {
        setUploadStatus(true)
      }
    } catch (error) {
      console.log(error);
      setUploadStatus(error.response.data);
    }
  };
  console.log({ uploadStatus });
  const validateData = (data) => {
    const columnIndexToCheck = 0;

    const valuesSet = new Set();

    for (let i = 1; i < data.length; i++) {
      const value = data[i][columnIndexToCheck];
      if (valuesSet.has(value)) {
        return false;
      }
      valuesSet.add(value);
    }

    return true;
  };

  const handleProceedClick = () => {
    addStudents();
  };

  return (
    <div>
      <div>
        <h2>Upload Student basic details - step one - MCA R16 [2018-2021]</h2>
        <br />
        <div className="bulkadmissionsupload">
          <h2 className="head">
            Upload Student Basic Details File - .xls, .xlsx format
          </h2>
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
            placeholder={selectedFile ? selectedFile.name : "No file chosen"}
            variant="outlined"
            className="textchoose"
            readOnly
          />
          <div className="buttonproceed">
            <Button
              variant="contained"
              onClick={handleProceedClick}
              disabled={!sheetData}
            >
              Proceed
            </Button>
          </div>
          <br />
          {error && <div className="error-message">{error}</div>}
          <div className="textshow">
            <textarea
              placeholder="Shows the data of the file"
              className="textfill"
              readOnly
              value={JSON.stringify(formattedData, null, 2)}
            />
          </div>
        </div>
        {}
      </div>
    </div>
  );
}
