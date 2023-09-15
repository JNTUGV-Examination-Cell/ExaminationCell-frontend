import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import jntugv from "./assests/jntugv.png";
import send from "./assests/send.svg";
import "./loginPage.css";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [verifyOtp, setVerifyOtp] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(false);

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
    setOTP(generatedOTP);

    const templateParams = {
      to_name: email,
      from_name: "Vamshi",
      message: `Your OTP is: ${generatedOTP}`,
    };
    console.log(templateParams);

    emailjs
      .send(
        "service_qdgv0cu",
        "template_s9akhn9",
        templateParams,
        "mLU5ET7GwMJqFXPD2"
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.log("Error sending email:", error);
      });
  };

  const verifyOTP = () => {
    if (otp === verifyOtp) {
      setVerificationStatus(true);
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
              sx={{ marginRight: "10px", width: "55%",'@media (max-width: 600px)':{} }}
              onChange={(e) => setVerifyOtp(e.target.value)}
              value={verifyOtp}
              className="textinput"
              name=""
              label="Enter the OTP"
            />
            <Button
              className="otp-button"
              onClick={verifyOTP}
              sx={
                { height: "54px",width: "35%", '@media (max-width: 600px)':{}}
              }
              variant="contained"
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
