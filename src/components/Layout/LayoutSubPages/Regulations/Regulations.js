import { useState, useCallback, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import api from "../../../apiReference";
import "./Regulations.css";
import { SearchIcon } from "lucide-react";


const Regulations = () => {
  const [regulationsData, setregulationsData] = useState([]);
  const [filteredRegulationsData, setfilteredRegulationsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchRegulationsData = async () => {
      try {
        const response = await api.get("/api/course/getCompleteRegulations");
        setregulationsData(response.data);
        setfilteredRegulationsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRegulationsData();
  }, []);

  const filterRegulations = useCallback(() => {
    const filteredData = regulationsData.filter(
      (regulations) =>
        Object.values(regulations).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        regulations.regulation_id.toString().includes(searchQuery) ||
        regulations.regulation.toString().includes(searchQuery)
    );
    setfilteredRegulationsData(filteredData);
  }, [searchQuery, regulationsData]);

  useEffect(() => {
    filterRegulations();
  }, [filterRegulations]);

  const columns = [
    // { field: "id", headerName: "S.No", width: 100},
    { field: "regulation_id", headerName: "Regulation Id", width:400},
    { field: "regulation", headerName: "Regulation",  width:400 },
    {
      field: "regulation_start_year",
      headerName: "Regulation Start Year",
      width:400
    },
  ];

  const filteredRegulationsDataWithPlaceholder = filteredRegulationsData.map(
    (row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          value === "" || value === null ? "Not Uploaded" : value,
        ])
      )
  );
  useEffect(() =>{
    setfilteredRegulationsData(filteredRegulationsDataWithPlaceholder);
  }, [regulationsData]);

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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="w-50" style={{ maxWidth: "100%" }}>
        <DataGrid
          rows={filteredRegulationsDataWithPlaceholder}
          columns={columns}
          getRowId={(row) => row.regulation_id}
        />
      </div>
    </>
  );
};

export default Regulations;
