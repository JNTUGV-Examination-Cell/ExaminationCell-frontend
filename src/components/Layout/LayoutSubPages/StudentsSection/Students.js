import { useEffect, useState } from "react";
import api from "../../../apiReference";
import { Typography } from "@mui/material";
import StudentImageDisplay from "./components/StudentImageDisplay";
import FilterPanel from "./components/FilterPanel";

const Students = () => {
  const [studentsData, setStudentsData] = useState();
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get("api/students/fetchallStudents");
        setStudentsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentData();
  }, []);

  const studentImageDisplayData = studentsData?.map((student) => {
    return {
      image: student.student_image,
      roll_no: student.roll_no,
      student_name: student.student_name,
    };
  });
  console.log({ studentImageDisplayData });
  return (
    <div>
      <Typography variant="h5">Students</Typography>
      <FilterPanel />
      {studentImageDisplayData && <StudentImageDisplay displayData={studentImageDisplayData} />}
    </div>
  );
};

export default Students;
