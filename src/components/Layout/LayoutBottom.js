import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const LayoutBottom = (role) => {
  return (
    <Box className="Nav-Content">
      <Sidebar role={role} />
      <Outlet />
    </Box>
  );
};

export default LayoutBottom;
