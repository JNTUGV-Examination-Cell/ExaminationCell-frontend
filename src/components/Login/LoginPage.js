import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import jntugv from "./assests/jntugv.png";
import send from "./assests/send.svg";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./loginPage.css";
// import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../apiReference";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verifyOtp, setVerifyOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function generateOTP() {
    const length = 6;
    let otp = "";
    const characters = "0123456789";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters.charAt(randomIndex);
    }

    return otp;
  }

  const sendOTP = async (e) => {
    e.preventDefault();

    const generatedOTP = generateOTP();
    const otpNumber = parseInt(generatedOTP, 10);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/staff/user/sendOtp",
        {
          email: email,
          otpValue: otpNumber,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log({otpValue: otpNumber})
    /// don't change this code
    // const templateParams = {
    //   to_name: email,
    //   from_name: "JNTUGV",
    //   message: `Your OTP is: ${generatedOTP}`,
    // };

    // emailjs
    //   .send(
    //     "service_lqagpuf",
    //     "template_7kvsokj",
    //     templateParams,
    //     "PGHEqinfstuz8ljJD"
    //   )
    //   .then((response) => {
    //     console.log("Email sent successfully:");
    //   })
    //   .catch((error) => {
    //     console.log("Error sending email:", error);
    //   });
  };

  const verifyOTP = async () => {
    let userDetails;
    const otpNumber = parseInt(verifyOtp, 10);
    console.log({
      email: email,
      otpValue: otpNumber,
    })
    try {
      const response = await api.post(
        "/api/staff/user/verifyOtp",
        {
          email: email, 
          otpValue: verifyOtp, 
        }
      );
      userDetails = response.data;
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(userDetails);
    if (userDetails.isLogin) {
      setVerificationStatus(true);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      navigate("/home");
    } else {
      setVerificationStatus(false);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box className="Main-box">
        <Box className="logo-box">
          <img className="logo" src={jntugv} alt="jntugv" />
        </Box>
        <Box className="form-box">
          <Typography variant="h6">
            Jawaharlal Nehru Technological University - Gurajada, Vizianagaram
          </Typography>
          <Box sx={{ height: "100px" }}>
            <TextField
              sx={{
                width: "80%",
                height: "20px",
                marginRight: "10px",
                marginTop: "20px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="textinput"
              name="Enter your Email"
              label="Enter your Email"
            />
            <img
              className="send-otp"
              onClick={sendOTP}
              src={send}
              alt="send otp"
            />
          </Box>
          <Box>
            <TextField
              sx={{
                marginRight: "10px",
                width: "55%",
                "@media (max-width: 600px)": {},
              }}
              onChange={(e) => setVerifyOtp(e.target.value)}
              value={verifyOtp}
              className="textinput"
              name=""
              label="Enter the OTP"
            />
            <Button
              className="otp-button"
              onClick={verifyOTP}
              sx={{
                height: "54px",
                width: "35%",
                "@media (max-width: 600px)": {},
              }}
              variant="contained"
            >
              Validate OTP
            </Button>
            <Snackbar
             open={open}
             autoHideDuration={6000}
             onClose={handleClose}
             message="Verification Done"
             action={action}
            />
          </Box>
        </Box>
      </Box>
      <p>
        {verificationStatus ? "Verification Successful" : "Verification Failed"}
      </p>
    </Box>
  );
};

export default LoginPage;
