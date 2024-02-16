import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import "./Layout.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../features/roles/roleSlice";
import { UserCircle2 } from "lucide-react";

const Layout = (props) => {
  const userRole = useSelector(selectUserRole);
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, pt: "64px" }}>
        {" "}
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#2E1389",
          }}
        >
          {" "}
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "#fff", paddingLeft: "250px" }}
              >
                JAWAHARLAL NEHRU TECHNOLOGY UNIVERSITY - GURAJADA VIZIANAGARAM
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#fff", paddingLeft: "250px" }}
              >
                {pathParts.map((part, index) => (
                  <Link
                    to={`/${pathParts.slice(0, index + 1).join("/")}`}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    {part}/
                  </Link>
                ))}
               
              </Typography>
            </Box>
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
