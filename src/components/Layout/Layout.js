import { Box, Typography } from "@mui/material";
import jntugv from "../../assests/jntugv.png";
import React, { useEffect } from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { selectUserRole } from "../../features/roles/roleSlice";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const userRole = useSelector(selectUserRole);
  useEffect(() => {});
  return (
    <Box>
      <Box>
        <Box className="Top-nav">
          <img className="logo1" src={jntugv} alt="jntugv-logo" />
          <Box className="Nav-right-header">
            <Typography>
              JAWAHARLAL NEHRU TECHNOLOGY UNIVERSITY - GURAJADA VIZIANAGRAM
            </Typography>
            <Typography variant="h6">{userRole}</Typography>
          </Box>
        </Box>
        <Box className="Nav-Content">
          <Sidebar />
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
