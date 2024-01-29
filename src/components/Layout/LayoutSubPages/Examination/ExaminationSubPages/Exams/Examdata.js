import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  collegeExamDataColumns,
  universityExaminationsDataColumns,
} from "./ExamDataMaintainance";
import { USER_LEVELS } from "../../../../../../constants/AllConstants";
import api from "../../../../../apiReference";
import { Typography, Button } from "@mui/material";

const Examdata = () => {
  const [examDataOfCollege, setExamDataOfCollege] = useState([]);
  const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const userLevel = USER_LEVELS[loginUserDetails.role];

  useEffect(() => {
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
    fetchExamData();
  }, [loginUserDetails.collegeCode]);

  const fetchAllExams = async (req, res) => {
    try {
      const response = await api.get("/api/examination/fetchAllExams");
      console.log({ response });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userLevel === 1) {
      fetchAllExams();
    }
  }, [userLevel]);
  const universityExaminationsData = [
    {
      id: 1,
      college_name: "University College of Engineering",
      college_code: "UCE",
      exam_name: "IV - I",
      exam_code: "ESE202301",
      total_students_applied: 500,
      amount: 1500.0,
      path: "/layout/examdata/manageexamination",
    },
    {
      id: 2,
      college_name: "School of Business",
      college_code: "SB",
      exam_name: "Mid I - I",
      exam_code: "MTE202302",
      total_students_applied: 300,
      amount: 1200.5,
      path: "/layout/examdata/manageexamination",
    },
    {
      id: 3,
      college_name: "College of Arts and Sciences",
      college_code: "CAS",
      exam_name: "I - II Sem",
      exam_code: "FPE202303",
      total_students_applied: 150,
      amount: 800.0,
      path: "/layout/examdata/manageexamination",
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
      <Typography sx={{ textAlign: "center", margin: "20px" }} variant="h5">
        Examination Maintainance
      </Typography>
      {userLevel === 2 || userLevel === 3 ? (
        <DataGrid
          columns={collegeExamDataColumns}
          rows={transformedData}
          pageSize={5}
          disableSelectionOnClick
        />
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "end", marginBottom: "15px" }}>
            <Button variant="contained">Save</Button>
          </div>
          <DataGrid
            columns={universityExaminationsDataColumns}
            rows={universityExaminationsData}
            pageSize={5}
            disableSelectionOnClick={true}
          />
        </div>
      )}
    </>
  );
};

export default Examdata;
