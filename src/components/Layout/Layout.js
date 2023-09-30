import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
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
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role");

  const roleLinks = {
    Admin: [
      { to: "/layout/homepage", icon: <HomeIcon className="Nav-icons" /> },
      { to: "/layout/batches", icon: <GroupsIcon className="Nav-icons" /> },
      {
        to: "/layout/colleges",
        icon: <CorporateFareIcon className="Nav-icons" />,
      },
      { to: "/layout/staff", icon: <PersonIcon className="Nav-icons" /> },
      {
        to: "/layout/notifications",
        icon: <NotificationsActiveIcon className="Nav-icons" />,
      },
    ],
    CBTexpert: [
      { to: "/layout/homepage", icon: <HomeIcon className="Nav-icons" /> },
      { to: "/layout/batches", icon: <GroupsIcon className="Nav-icons" /> },
      { to: "/layout/examinations", icon: <HomeIcon className="Nav-icons" /> },
      // { to: "/layout/mid-exams", icon: <GroupsIcon className="Nav-icons" /> },
      // { to: "/layout/staff", icon: <PersonIcon className="Nav-icons" /> },
    ],
    // Add more roles and their respective links here
  };

  const links = roleLinks[role] || [];

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
            {links.map((link, index) => (
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
