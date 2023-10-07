import React from "react";
import { Link } from "react-router-dom";
import RollData from "./RoleData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = (role) => {
  console.log({ role });
  const roleLinks = RollData[role.role] || [];
  console.log(roleLinks);
  return (
    <div className="Side-nav">
      {roleLinks.map((link, index) => (
        <Link to={link.to} key={index}>
          {link.icon}
        </Link>
      ))}
      <Link to="/layout/profilepage">
        <AccountCircleIcon className="Nav-icons" />
      </Link>
      <Link to="/">
        <LogoutIcon className="Nav-icons" />
      </Link>
    </div>
  );
};

export default Sidebar;
