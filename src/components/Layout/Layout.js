import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../features/roles/roleSlice";
import { UserCircle2 } from "lucide-react";

const Layout = (props) => {
  const userRole = useSelector(selectUserRole);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, pt: "64px" }}>
        {" "}
        <AppBar position="fixed" sx={{ backgroundColor: "#2E1389" }}>
          {" "}
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#fff", paddingLeft: "250px" }}
            >
            JAWAHARLAL NEHRU TECHNOLOGY UNIVERSITY - GURAJADA VIZIANAGARAM
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UserCircle2 />
              <Typography
                variant="h6"
                sx={{ color: "#fff", marginLeft: "10px" }}
              >
                {userRole}
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box className="Nav-Content">
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
