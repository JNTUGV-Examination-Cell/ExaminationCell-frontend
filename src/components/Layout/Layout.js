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
import { Route, Routes } from "react-router-dom";
import HomePage from "./LayoutSubPages/HomeSection/HomePage";
import CollegePage from "./LayoutSubPages/CollegeSection/CollegePage";
import { Link, Link as RouterLink } from "react-router-dom";
import ProfilePage from "./LayoutSubPages/ProfileSection/ProfilePage";
import { blue } from "@mui/material/colors";

const Layout = () => {
  const role = "Administrator";
  return (
    <Box>
      <Box>
        <Box className="Top-nav">
          <img className="logo1" src={jntugv} alt="jntugv-logo" />
          <Box className="Nav-right-header">
            <Typography variant="h6">
              JAWAHARLAL NEHRU TECHNOLOGY UNIVERSITY - GURAJADA VIZIANAGRAM
            </Typography>
            <Typography variant="h6">{role}</Typography>
          </Box>
        </Box>
        <Box className="Nav-Content">
          <Box className="Side-nav">
            <Link to="/layout">
              <HomeIcon className="Nav-icons" />
            </Link>
            <Link to="/">
              <GroupsIcon className="Nav-icons" />
            </Link>
            <Link to="/layout/college">
              <CorporateFareIcon className="Nav-icons" />
            </Link>
            <Link to="/">
              <PersonIcon className="Nav-icons" />
            </Link>
            <Link to="/">
              <NotificationsActiveIcon className="Nav-icons" />
            </Link>
            <Link to="/">
              <AccountCircleIcon className="Nav-icons" />
            </Link>
            <Link to="/">
              <LogoutIcon className="Nav-icons" />
            </Link>
          </Box>
          <Box className="Content">
            <Routes>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/layout/college" element={<CollegePage />} />
              <Route path="/layout" element={<HomePage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
