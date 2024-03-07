import { Button } from "@mui/material";

const attendedExamsColumns = [
  {
    field: "id",
    headerName: "Sl.No",
    width: 20,
  },
  {
    field: "exam",
    headerName: "Exam",
    width: 160,
  },
  {
    field: "exam_code",
    headerName: "Exam Code",
  },
  {
    field: "batch",
    headerName: "Batch",
  },
  {
    field: "semester",
    headerName: "Semester",
  },
  {
    field: "examtype",
    headerName: "Exam Type",
  },
  {
    field: "any",
    headerName: "Any",
  },
  {
    field: "month",
    headerName: "Month",
  },
  {
    field: "year",
    headerName: "Year",
  },
  {
    field: "Type",
    headerName: "Type",
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Button>Check</Button>
      </div>
    ),
  },
];

const eligibleExamsColumns = [
  {
    field: "id",
    headerName: "Sl.No",
    width: 20,
  },
  {
    field: "exam",
    headerName: "Exam",
    width: 160,
  },
  {
    field: "exam_code",
    headerName: "Exam Code",
  },
  {
    field: "batch",
    headerName: "Batch",
  },
  {
    field: "semester",
    headerName: "Semester",
  },
  {
    field: "examtype",
    headerName: "Exam Type",
  },
  {
    field: "any",
    headerName: "Any",
  },
  {
    field: "month",
    headerName: "Month",
  },
  {
    field: "year",
    headerName: "Year",
  },
  {
    field: "Type",
    headerName: "Type",
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Button>Register</Button>
      </div>
    ),
  },
];

export { attendedExamsColumns, eligibleExamsColumns };