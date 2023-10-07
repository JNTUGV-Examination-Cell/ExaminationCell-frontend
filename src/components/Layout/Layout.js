import { Box, Typography } from "@mui/material";
import jntugv from "../../assests/jntugv.png";
import React from "react";
import "./Layout.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation();
  const role = location.state.role;
  console.log({ role });
  return (
    <Box>
      <Box>
        <Box className="Top-nav">
          <img className="logo1" src={jntugv} alt="jntugv-logo" />
          <Box className="Nav-right-header">
            <Typography>
              JAWAHARLAL NEHRU TECHNOLOGY UNIVERSITY - GURAJADA VIZIANAGRAM
            </Typography>
            <Typography variant="h6">{role}</Typography>
          </Box>
        </Box>
        <Box className="Nav-Content">
          <Box className="Side-nav">
            <Link to="/layout/homepage">
              <HomeIcon className="Nav-icons" />
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
          </Box>
          <Box
            sx={{
              margin: "20px",
            }}
            className="Content"
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
