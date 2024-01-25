import { Button } from "@mui/material";

const collegeExamDataColumns = [
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
  },
  {
    field: "action",
    headerName: "Action",
    valueFormatter: (params) => {
      <>
        <Button to={params.path}>Manage</Button>
      </>;
    },
  },
];

const universityExaminationsDataColumns = [
  {
    field: "id",
    headerName: "Sl.No",
    width: 20,
  },
  {
    field: "college_name",
    headerName: "College Name",
    width: 250,
  },
  {
    field: "college_code",
    headerName: "College Code",
  },
  {
    field: "exam_name",
    headerName: "Exam Name",
  },
  {
    field: "exam_code",
    headerName: "Exam Code",
  },
  {
    field: "total_students_applied",
    headerName: "Total Students Applied",
  },
  {
    field: "amount",
    headerName: "Amount",
  },
];

export { collegeExamDataColumns, universityExaminationsDataColumns };
