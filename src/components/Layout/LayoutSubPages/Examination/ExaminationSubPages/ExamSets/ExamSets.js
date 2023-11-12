import React from "react";
import { Link } from "react-router-dom";
import "./ExamSets.css";
import ExamSetsData from "./ExamSetsData.json";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectCurrentExam } from "../../../../../../features/exams/examSlice";
const ExamSets = () => {
  const currentExam = useSelector(selectCurrentExam);

  return (
    <>
      <div className="examsets">
        <Typography variant="h5" className="examsetstitle">
          Exam Sets - {currentExam.currentExam} - {currentExam.currentExamName}
        </Typography>
        <div className="setsblocks">
          {ExamSetsData.map((examSet, index) => (
            <div className="sets" key={index}>
              <Typography className="timings">{examSet.date}</Typography>
              <hr style={{ width: "60%" }} />
              {examSet.subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex}>
                  <div className="SubLink">
                    <Typography className="subjects">
                      {subject.code}-{subject.name}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/layout/examdata/manageexamination/Sets/examsets/setforparticularexam`}
                      variant="contained"
                      className="managebtn"
                      state={{ code: subject.code }}
                    >
                      {" "}
                      manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExamSets;
