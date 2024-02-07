import React from 'react';
import {useState, useCallback, useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Typography, Button,TextField, InputAdornment } from "@mui/material";
import api from "../apiReference";
import "./Regulations.css";
import { SearchIcon } from "lucide-react";

const Regulations = () => {
  const [regulationsData, setregulationsData] = useState([]);
  const [filteredRegulationsData, setfilteredRegulationsData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  
  useEffect(() => {
    const fetchRegulationsData = async () => {
      try {
        const response = await api.get("/api/regulations/getCompleteRegulations");
        setregulationsData(response.data);
        setfilteredRegulationsData(response.data); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchRegulationsData();
  }, []);

  const filterRegulations = useCallback(() => {
    const filteredData = regulationsData.filter((regulation) =>
      Object.values(regulation).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
      || regulation.regulation_id.toString().includes(searchQuery) || regulation.regulation.toString().includes(searchQuery)
    );
    setfilteredRegulationsData(filteredData);
  }, [searchQuery, regulationsData]);


  useEffect(() => {
    filterRegulations();
  }, [filterRegulations]); 

   

  const columns = [
    { field: "regulation_id", headerName: "Regulation Id",flex:1},
    { field: "regulation", headerName: "Regulation",flex:1 },
    { field: "regulation_start_year", headerName: "Regulation Start Year",flex:2},
    {
      field: "edit",
      headerName: "Edit",
      flex:1,
      renderCell: (params) => (
        <Button 
        component={Link}
        to="/layout/regulations/edit"
        variant="contained" 
        color="primary"
        >
          Edit
        </Button>
      ),
    },
  ];

    return (
            <>
      <Typography className="RegulationTitle" variant="h5" sx={{ textAlign: "center", margin: "20px" }}>
        Regulations
      </Typography>
      
      <div className="AddButton-SearchBar">
      <div className="addbutton">
        <Button
        component={Link}
        to="/layout/regulations/add"  
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
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        />
      </div>
     
      </div>
      <div className="container data-table">
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

