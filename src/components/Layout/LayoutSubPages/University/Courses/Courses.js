import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 70, editable: false },
  { field: "course", headerName: "Course", width: 130, editable: true },
  {
    field: "courseFullName",
    headerName: "Course Full Name",
    width: 200,
    editable: true,
  },
  {
    field: "course_code",
    headerName: "Course Code",
    width: 110,
    editable: true,
  },
  {
    field: "course_type",
    headerName: "Course Type",
    width: 110,
    editable: true,
  },
  {
    field: "entrance_exam",
    headerName: "Entrance Exam",
    width: 120,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    course: "B.Tech",
    courseFullName: "Bachelors of Tecchnology",
    course_code: "A",
    course_type: "UG",
    entrance_exam: "AP EAPCET",
  },
  {
    id: 2,
    course: "M.Tech",
    courseFullName: "Masters of Tecchnology",
    course_code: "C",
    course_type: "PG",
    entrance_exam: "AP PGCET",
  },
  {
    id: 3,
    course: "B.Pharm",
    courseFullName: "Bachelors of Pharmacy",
    course_code: "B",
    course_type: "UG",
    entrance_exam: "AP EAPCET",
  },
];
export default function Courses() {
  const [gridRows, setGridRows] = React.useState(rows);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, props }) => {
      setGridRows((prevRows) => {
        const updatedRows = [...prevRows];
        const editedRow = updatedRows.find((row) => row.id === id);
        editedRow[field] = props.value;
        return updatedRows;
      });
    },
    [setGridRows]
  );

  const handleAddRow = () => {
    setGridRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, name: "", age: 0, email: "" },
    ]);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ display: "flex", justifyContent: "end" }}>
        <div style={{ display: "flex", gap: 2 }}>
          <Button onClick={handleAddRow}>Add Course</Button>
          <Button>Save Courses</Button>
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }
  return (
    <div
      style={{
        height: 400,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Courses</Typography>
      <DataGrid
        rows={gridRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        editMode="cell"
        onEditCellChangeCommitted={handleCellEditCommit}
        slots={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
