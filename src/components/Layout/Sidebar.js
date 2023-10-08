import React from "react";
import { Link } from "react-router-dom";
import RollData from "./RoleData";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Typography } from "@mui/material";

const Sidebar = (role) => {
  console.log({ role });
  const roleLinks = RollData[role.role] || [];
  console.log(roleLinks);
  return (
    <div className="Side-nav">
      <Link to="/layout/homepage">
        <HomeIcon className="Nav-icons" />
        <Typography>Home</Typography>
      </Link>
      <Link to="/layout/batches">
        <GroupsIcon className="Nav-icons" />
      </Link>
      <Link to="/layout/colleges">
        <CorporateFareIcon className="Nav-icons" />
      </Link>
      <Link to="/layout/staff">
        <PersonIcon className="Nav-icons" />
      </Link>
      <Link to="/layout/notifications">
        <NotificationsActiveIcon className="Nav-icons" />
      </Link>
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
