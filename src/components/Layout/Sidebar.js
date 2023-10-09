import React from "react";
import { Link } from "react-router-dom";
import RollData from "./RoleData";
import { Typography } from "@mui/material";
import { selectUserRole } from "../../features/roles/roleSlice";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const userRole = useSelector(selectUserRole);
  return (
    <div className="Side-nav">
      {RollData[userRole].map((link, index) => (
        <Link key={index} to={link.to}>
          {link.icon}
          <Typography>{link.text}</Typography>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
