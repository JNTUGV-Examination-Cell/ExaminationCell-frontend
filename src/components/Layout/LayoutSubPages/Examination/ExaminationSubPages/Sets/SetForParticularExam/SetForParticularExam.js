// import React, { useState } from "react";
import "./SetForParticularExam.css";
import { Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function SetForParticularExam() {
  // const [redirectToPage, setRedirectToPage] = useState(null);
  const setstitle =
    "Sets - R111223 - B.Tech I Year I sem R20 Reg February 2023 - R201102 - COMMUNICATIVE ENGLISH - 20 February 2023 10:00 AM";
  const set = "SET-1";
  const ntable = "Not Available";
  // if (redirectToPage) {
  //   window.location.href = redirectToPage;
  // }
  return (
    <div className="malpractice">
      <Typography variant="h5" className="head">
        {setstitle}
      </Typography>
      <Grid container spacing={2} className="buttons">
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout"
          >
            Sets Allocation
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout/markabsent"
          >
            Mark Absent
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout/markmalpractice"
          >
            Mark MalPractice
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            style={{
              height: 30,
            }}
            component={Link}
            to="/layout"
          >
            Download D Form
          </Button>
        </Grid>
      </Grid>
      <div className="setblock">
        <Typography variant="h6" className="set">
          {set}
        </Typography>
        <hr style={{ width: "50%" }}></hr>
        <Typography variant="h6" className="ntable">
          {ntable}
        </Typography>
        <hr style={{ width: "50%" }}></hr>
      </div>
    </div>
  );
}

export default SetForParticularExam;