import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExamSets.css';
import ExamSetsData from './ExamSetsData.json';

const ExamSets = () => {
  const [examSets, setExamSets] = useState([]);

  useEffect(() => {
    setExamSets(ExamSetsData);
  }, []);
 const title="Exam Sets - R111223 - B.Tech I Year I Sem R20 Reg February 2023"
  return (
    <>
      <div className='examsets'>
        <div className='examsetstitle'>{title}</div>
        <div className='setsblocks'>
          {examSets.map((examSet, index) => (
            <div className='sets' key={index}>
              <div className='timings'>{examSet.date}</div>
              <hr style={{ width: '60%' }} />
              {examSet.subjects.map((subject, subjectIndex) => (
                <div key={subjectIndex}>
                  <div className='subjects'>{subject.name}</div>
                  <div className={`managelink-manage-link-${subjectIndex}`}>
                    <Link to={subject.manageLink}>Manage</Link>
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
