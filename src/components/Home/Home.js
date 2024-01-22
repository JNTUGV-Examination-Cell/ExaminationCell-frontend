import { Box, Button, Typography } from "@mui/material";
import React from "react";
import jntugv from "../../assests/jntugv.png";
import "./Home.css";
import { Link, Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../features/roles/roleSlice";
import { USER_LEVELS } from "../../constants/AllConstants";

const Home = () => {
  const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const username = loginUserDetails.username;
  const userLevel = USER_LEVELS[loginUserDetails.role];
  console.log({ userLevel });
  const dispatch = useDispatch();
  const handleRoleChange = (role) => {
    dispatch(setUserRole(role));
  };
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
          {userLevel === 1 && (
            <Box className="role-box">
              <Typography
                sx={{
                  textDecoration: "none",
                  color: "#007bff",
                  marginBottom: "10px",
                }}
                component={RouterLink}
                to="/layout"
                state={{ role: "Admin" }}
                onClick={() => handleRoleChange("Admin")}
                variant="h6"
              >
                Admin
              </Typography>
              <Typography className="role-function">Administration</Typography>
              <Typography>Access: Enabled</Typography>
            </Box>
          )}
          {userLevel === 1 ||
            (userLevel === 2 && (
              <Box className="role-box">
                <Typography
                  sx={{
                    textDecoration: "none",
                    color: "#007bff",
                    marginBottom: "10px",
                  }}
                  component={RouterLink}
                  to="/layout"
                  state={{ role: "CBTexpert" }}
                  variant="h6"
                  onClick={() => handleRoleChange("CBTexpert")}
                >
                  CBT Expert
                </Typography>
                <Typography className="role-function">Examinations</Typography>
                <Typography>Access: Enabled</Typography>
              </Box>
           ))} 
          <Box className="role-box">
            <Typography
              sx={{
                textDecoration: "none",
                color: "#007bff",
                marginBottom: "10px",
              }}
              component={RouterLink}
              to="/layout"
              state={{ role: "Examinationadmin" }}
              variant="h6"
              onClick={() => handleRoleChange("Examinationadmin")}
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
          to="/"
          variant="contained"
        >
          LOGOUT
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
