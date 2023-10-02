import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import jntugv from "../../assests/jntugv.png";
import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./LayoutSubPages/PortalNotification/Sidebar";

const Layout = () => {
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role");

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
          <Sidebar role={role} />
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
