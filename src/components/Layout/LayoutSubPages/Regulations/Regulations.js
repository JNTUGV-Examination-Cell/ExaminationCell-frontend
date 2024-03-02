import { useState, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import api from "../../../apiReference";
import "./Regulations.css";

const Regulations = () => {
  const [regulationsData, setRegulationsData] = useState([]);
  const [filteredRegulationsData, setFilteredRegulationsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRegulationsData = async () => {
      try {
        const response = await api.get("/api/course/getCompleteRegulations");
        setRegulationsData(response.data);
        setFilteredRegulationsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRegulationsData();
  }, []);

  const filterRegulations = useCallback(() => {
    const filteredData = regulationsData.filter(
      (regulation) =>
        Object.values(regulation).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        regulation.regulation_id.toString().includes(searchQuery) ||
        regulation.regulation.toString().includes(searchQuery)
    );
    setFilteredRegulationsData(filteredData);
  }, [searchQuery, regulationsData]);

  useEffect(() => {
    filterRegulations();
  }, [filterRegulations]);

  const columns = [
    { field: "regulation_id", headerName: "Regulation Id", width: 400 },
    { field: "regulation", headerName: "Regulation", width: 400 },
    {
      field: "regulation_start_year",
      headerName: "Regulation Start Year",
      width: 400
    },
  ];

  return (
    <>
      <Typography
        className="RegulationTitle"
        variant="h5"
        sx={{ textAlign: "center", margin: "20px" }}
      >
        Regulations
      </Typography>

      <div className="AddButton-SearchBar">
        <div className="addbutton">
          <Button
            component={Link}
            to={`/layout/regulations/addregulation`}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <div className="RegulationssearchBar">
          <TextField
            label="Search Regulations"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <br />
      <div className="w-50" style={{ maxWidth: "100%" }}>
        <DataGrid
          rows={filteredRegulationsData}
          columns={columns}
          getRowId={(row) => row.regulation_id}
        />
      </div>
    </>
  );
};

export default Regulations;
