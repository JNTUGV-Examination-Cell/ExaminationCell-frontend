import { Box, Button, Typography } from "@mui/material";
import React from "react";
import jntugv from "../../assests/jntugv.png";
import "./Home.css";
import { Link, Link as RouterLink } from "react-router-dom";

const Home = () => {
  const username = "Bindu Madhuri Ch";
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className="logo" src={jntugv} alt="jntugv-logo" />
        <Typography sx={{ margin: "20px" }} className="Main-head" variant="h6">
          JAWAHARLAL NEHRU TECHNOLOGY UNIVERSITY - GURAJADA VIZIANAGRAM
        </Typography>
        <Typography
          sx={{ marginTop: "20px" }}
          className="user-head"
          variant="h6"
        >
          Hello, {username}
        </Typography>
        <Box className="role-main-box">
          <Box className="role-box">
            <Typography
              sx={{
                textDecoration: "none",
                color: "#007bff",
                marginBottom: "10px",
              }}
              component={RouterLink}
              to="/layout"
              variant="h6"
            >
              Admin
            </Typography>
            <Typography className="role-function">Administration</Typography>
            <Typography>Access: Enabled</Typography>
          </Box>
          <Box className="role-box">
            <Typography
              sx={{
                textDecoration: "none",
                color: "#007bff",
                marginBottom: "10px",
              }}
              component={RouterLink}
              to="/random"
              variant="h6"
            >
              CBT Expert
            </Typography>
            <Typography className="role-function">Examinations</Typography>
            <Typography>Access: Enabled</Typography>
          </Box>
          <Box className="role-box">
            <Typography
              sx={{
                textDecoration: "none",
                color: "#007bff",
                marginBottom: "10px",
              }}
              component={RouterLink}
              to="/random"
              variant="h6"
            >
              Examination Admin
            </Typography>
            <Typography className="role-function">Examinations</Typography>
            <Typography>Access: Enabled</Typography>
          </Box>
        </Box>
        <Button
          sx={{ alignContent: "center", width: "80px", marginTop: "20px" }}
          LinkComponent={Link}
          to="/application"
          variant="contained"
        >
          LOGOUT
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
