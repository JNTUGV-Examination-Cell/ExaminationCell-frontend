import { Box, Typography } from "@mui/material";
import jntugv from "../../assests/jntugv.png";
import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const location = useLocation();
  const [admin, setAdmin] = useState(false);
  const [cbtExpert, setCbtExpert] = useState(false);
  const [examinationAdmin, setExaminationAdmin] = useState(false);
  // const [role, setRole] = useState("")
  useEffect(() =>{

  })
  const role = location.state.role;
  // setRole(location.state.role);
  // console.log({ role });
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
