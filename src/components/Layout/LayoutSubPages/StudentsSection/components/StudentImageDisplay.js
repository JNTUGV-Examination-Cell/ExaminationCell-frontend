import { Card, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const StudentImageDisplay = ({ displayData }) => {
  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {displayData.length > 0 &&
        displayData?.map((data) => (
          <Card
            sx={{
              width: 200,
              height: 200,
              margin: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={data.student_image} alt={data.student_name} />
            <Link
              component={RouterLink}
              to={`/layout/students/${data.roll_no}`}
            >
              {data.roll_no}
            </Link>
          </Card>
        ))}
    </div>
  );
};

export default StudentImageDisplay;