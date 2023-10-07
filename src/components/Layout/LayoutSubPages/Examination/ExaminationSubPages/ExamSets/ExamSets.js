import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExamSets.css';
import ExamSetsData from './ExamSetsData.json';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

const ExamSets = () => {
  const [examSets, setExamSets] = useState([]);

  useEffect(() => {
    setExamSets(ExamSetsData);
  }, []);
 const title="Exam Sets - R111223 - B.Tech I Year I Sem R20 Reg February 2023"
  return (
    <>
      <div className='examsets'>
      <Typography variant="h5" className='examsetstitle'>
          {title}
        </Typography>
        <div className='setsblocks'>
          {examSets.map((examSet, index) => (
            <div className='sets' key={index}>
              <Typography variant='h6' className='timings'>{examSet.date}</Typography>
              <hr style={{ width: '60%' }} />
              {examSet.subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex}>
                  <div className='SubLink'>
                  <Typography variant='h6' className='subjects'>{subject.name}</Typography>
                  <div className={`managelink-manage-link-${subjectIndex}`} align="right">
                    <Button component={Link} to={subject.manageLink} variant="contained" className='managebtn'> Manage
                    </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ExamSets;
