import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ExamSets.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectCurrentExam } from "../../../../../../features/exams/examSlice";

const ExamSets = () => {
  const currentExam = useSelector(selectCurrentExam);
  const [examSets, setExamSets] = useState([]);

  useEffect(() => {
    const fetchExamSets = async () => {
      try {
        const response = await fetch(
          `http://localhost:9000/api/examination/getExaminationSubjects`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              notification_id: currentExam.currentExam,
            }),
          }
        );
        const data = await response.json();
        setExamSets(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching exam sets:", error);
      }
    };

    fetchExamSets();
  }, [currentExam.currentExam]);

  return (
    <div className="examsets">
      <Typography variant="h5" className="examsetstitle">
        Exam Sets - {currentExam.currentExam} - {currentExam.currentExamName}
      </Typography>
      <div className="setsblocks">
        {examSets && examSets.length > 0 ? (
          examSets.map((examSet, index) => (
            <div className="sets" key={index}>
              <hr style={{ width: "60%" }} />
              <div className="SubLink">
                <Typography>{examSet.subject_code}</Typography>-
                <Typography>{examSet.subject_name}</Typography>
                <Button
                  component={Link}
                  to={`/layout/examdata/manageexamination/Sets/examSet/setforparticularexam`}
                  variant="contained"
                  className="managebtn"
                  state={{ code: examSet.subject_code }}
                >
                  Manage
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Typography>No exam sets available.</Typography>
        )}
      </div>
    </div>
  );
};

export default ExamSets;
