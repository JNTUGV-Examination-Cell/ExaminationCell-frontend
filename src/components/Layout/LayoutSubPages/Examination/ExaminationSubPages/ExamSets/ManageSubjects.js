import React from 'react';

const ManageSubject = ({ match }) => {
  const subjectId = match.params.subjectId;
  return (
    <div>
      <h2>Manage Subject - {subjectId}</h2>
    </div>
  );
};

export default ManageSubject;
