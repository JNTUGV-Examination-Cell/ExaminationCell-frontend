import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import jntugv from "./assests/jntugv.png";
import send from "./assests/send.svg";
import "./loginPage.css";
// import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../apiReference";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarProvider, useSnackbar } from "notistack";

const LoginPage = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoginPageContent />
    </SnackbarProvider>
  );
};

const LoginPageContent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [verifyOtp, setVerifyOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleOtpClick = (newState) => {
    setState({ ...newState, open: true });
  };

  const handleOtpClose = () => {
    setState({ ...state, open: false });
  };

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
    console.log({ otpValue: otpNumber });
    handleOtpClick({ vertical: "top", horizontal: "center" });
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

  const handleValidationSuccess = () => {
    enqueueSnackbar("Verification Successful", { variant: "success" });
  };

  const handleValidationFailure = () => {
    enqueueSnackbar("Verification Failed", { variant: "error" });
  };

  const verifyOTP = async () => {
    let userDetails;
    const otpNumber = parseInt(verifyOtp, 10);
    console.log({
      email: email,
      otpValue: otpNumber,
    });
    try {
      const response = await api.post("/api/staff/user/verifyOtp", {
        email: email,
        otpValue: verifyOtp,
      });
      userDetails = response.data;
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(userDetails);
    if (userDetails.isLogin) {
      setVerificationStatus(true);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      handleValidationSuccess();
      navigate("/home");
    } else {
      setVerificationStatus(false);
      handleValidationFailure();
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
            <Snackbar
              className="snackbar"
              anchorOrigin={{ vertical, horizontal }}
              autoHideDuration={3000}
              open={open}
              onClose={handleOtpClose}
              message="OTP Sent"
              key={vertical + horizontal}
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
              handleValidationClick
            >
              Validate OTP
            </Button>
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
