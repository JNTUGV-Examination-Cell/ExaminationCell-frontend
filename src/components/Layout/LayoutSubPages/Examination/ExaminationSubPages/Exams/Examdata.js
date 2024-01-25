import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  collegeExamDataColumns,
  universityExaminationsDataColumns,
} from "./ExamDataMaintainance";
import { USER_LEVELS } from "../../../../../../constants/AllConstants";
import api from "../../../../../apiReference";
// Corrected import path

const Examdata = () => {
  const [examDataOfCollege, setExamDataOfCollege] = useState([]);
  const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userLevel = USER_LEVELS[loginUserDetails.role];
  const fetchExamData = async () => {
    let collegeCode = loginUserDetails.collegeCode;
    try {
      const response = await api.get(
        `/api/examination/fetchExamData/${collegeCode}`
      );
      setExamDataOfCollege(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExamData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const universityExaminationsData = [
    {
      id: 1,
      college_name: "University College of Engineering",
      college_code: "UCE",
      exam_name: "End Semester Examination",
      exam_code: "ESE202301",
      total_students_applied: 500,
      amount: 1500.0,
    },
    {
      id: 2,
      college_name: "School of Business",
      college_code: "SB",
      exam_name: "Midterm Exam",
      exam_code: "MTE202302",
      total_students_applied: 300,
      amount: 1200.5,
    },
    {
      id: 3,
      college_name: "College of Arts and Sciences",
      college_code: "CAS",
      exam_name: "Final Year Project Evaluation",
      exam_code: "FPE202303",
      total_students_applied: 150,
      amount: 800.0,
    },
  ];

  const transformedData = examDataOfCollege.map((item) => ({
    id: item.id,
    examWithYear: `${item.regulation_course} ${item.regulation_course_set} ${item.month} ${item.year}`,
    exam: `${item.regulation_course} ${item.regulation_course_set}`,
    exam_code: item.exam_code,
    batch: `${item.regulation_course}`,
    semester: `${item.regulation_course_set}`,
    examtype: item.type,
    any: "common",
    month: item.month,
    year: item.year.toString(),
    Type: "self",
    path: "/layout/examdata/manageexamination",
  }));

  return (
    <>
      {userLevel === 2 || userLevel === 3 ? (
        <DataGrid
          rows={transformedData}
          columns={collegeExamDataColumns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      ) : (
        <DataGrid
          rows={universityExaminationsData}
          columns={universityExaminationsDataColumns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      )}
    </>
  );
};

export default Examdata;
