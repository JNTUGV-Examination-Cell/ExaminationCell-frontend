import React from "react";
import { Link } from "react-router-dom";
import RollData from "./RoleData";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../features/roles/roleSlice";

const Sidebar = () => {
  // const userRole = sessionStorage.getItem("userRole");
  const userRole = useSelector(selectUserRole);
  return (
    <div className="Side-nav">
      {RollData[userRole].map((link, index) => (
        <Link onClick={link.onclick} key={index} to={link.to}>
          {link.icon}
          <Typography>{link.text}</Typography>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
