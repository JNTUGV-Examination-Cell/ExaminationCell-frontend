import React from "react";
import { useLocation } from "react-router-dom";

const ManageSubject = () => {
  const location = useLocation();
  const scode = location.state.code;
  console.log(scode);


  return (
    <div>
      <h2>Manage Subject : {scode} </h2>
    </div>
  );
};

export default ManageSubject;