import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setExam,
  setExamName,
} from "../../../../../../features/exams/examSlice";
import { useEffect, useState } from "react";
import { PAYMENT_ACCEPTANCE } from "./constants/constants";

const ManageExam = ({ params }) => {
  const dispatch = useDispatch();
  const { row } = params;
  const handleManageClick = () => {
    dispatch(setExam(row?.exam_code));
  };

  useEffect(() => {
    dispatch(setExamName(row?.exam));
  }, [dispatch, row?.exam]);

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Link to={row?.path}>
        <Button onClick={handleManageClick}>Manage</Button>
      </Link>
    </div>
  );
};
const ManageExamForUniversity = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (selected) => {
    setSelectedOption(selected);
  };

  return (
    <div>
      <select onChange={(e) => handleOnChange(e.target.value)} value={selectedOption}>
        <option key="default" value="">
          Select Status
        </option>
        {PAYMENT_ACCEPTANCE.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ManageExamForUniversity;

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
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <ManageExam params={params} />
      </div>
    ),
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
    width: 240,
  },
  {
    field: "college_code",
    headerName: "College Code",
    width: 120,
  },
  // {
  //   field: "exam_name",
  //   headerName: "Exam Name",
  //   width: 100,
  // },
  {
    field: "exam_code",
    headerName: "Exam Code",
  },
  {
    field: "total_students_applied",
    headerName: "Total Students",
    width: 120,
    renderCell: (params) => {
      return (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {params.value}
        </div>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => (
      <div style={{ display: "flex", width: "100%", justifyContent: "left" }}>
        <ManageExam params={params} />
      </div>
    ),
  },
  {
    field: "payment_date",
    headerName: "Payment Date",
    renderCell: () => {
      return (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <input type="date" />
        </div>
      );
    },
    width: 180,
  },
  {
    field: "payment_status",
    headerName: "Payment Status",
    width: 120,
    renderCell: (params) => {
      return <ManageExamForUniversity />;
    },
  },
];

export { collegeExamDataColumns, universityExaminationsDataColumns };
