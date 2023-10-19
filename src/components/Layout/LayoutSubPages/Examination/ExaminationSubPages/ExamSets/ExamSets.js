import React from "react";
import { Link } from "react-router-dom";
import "./ExamSets.css";
import ExamSetsData from "./ExamSetsData.json";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
const ExamSets = () => {
  const title =
    "Exam Sets - R111223 - B.Tech I Year I Sem R20 Reg February 2023";

  return (
    <>
      <div className="examsets">
        <Typography variant="h5" className="examsetstitle">
          {title}
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
                      to={`/layout/setforparticularexam`}
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
