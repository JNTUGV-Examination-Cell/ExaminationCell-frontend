import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import api from "../../../apiReference";
import './bulkadmissions.css';
import { Typography, Button,TextField, InputAdornment } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollegePage = () => {
  // const navigate = useNavigate();
  const [collegesData, setCollegesData] = useState([]);
  const [filteredCollegesData, setfilteredCollegesData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  
  
  useEffect(() => {
    const fetchCollegesData = async () => {
      try {
        const response = await api.get("api/college/fetchColleges");
        setCollegesData(response.data);
        setfilteredCollegesData(response.data); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchCollegesData();
  }, []);

  const filterColleges = useCallback(() => {
    const filteredData = collegesData.filter((colleges) =>
      Object.values(colleges).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
      || colleges.id.toString().includes(searchQuery) || colleges.college_name.toString().includes(searchQuery) || colleges.college_code.toString().includes(searchQuery)
    );
    setfilteredCollegesData(filteredData);
  }, [searchQuery, collegesData]);

  useEffect(() => {
    filterColleges();
  }, [filterColleges]); 

  const columns = [
    { field: "id", headerName: "Id",flex:1},
    { field: "college_name", headerName: "College Name",flex:3,editable: true  },
    { field: "college_code", headerName: "College Code",flex:2,editable: true },
    { field: "district", headerName: "District",flex:2,editable: true },
    { field: "college_type", headerName: "College Type",flex:2,editable: true },
    { field: "address", headerName: "Address",flex:3,editable: true },
    { field: "pincode", headerName: "Postal Address",flex:2,editable: true },
    { field: "college_status", headerName: "College Status",flex:2,editable: true },
    {
      field: "edit",
      headerName: "Edit",
      flex:2,
      renderCell: () => (
        <Button
        variant="contained" 
        color="primary"
        
        >
          Edit
        </Button>
      ),
      width: 100,
    },
  ];

  const filteredCollegesDataWithPlaceholder = filteredCollegesData.map((row) =>
  Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      value === "" || value === null ? "Not Uploaded" : value,
    ])
  )
);

  return (
    <>
    <Typography className="CollegesTitle" variant="h5" sx={{ textAlign: "center", margin: "20px" }}>
        Colleges
      </Typography>
      
      <div className="AddButton-SearchBar">
      <div className="addbutton">
        <Button
        component={Link}
        to="/Layout/LayoutSubPages/CollegeSubPages/AddCollegePage"
          variant="contained" 
          color="primary" 
        >
          Add Colleges 
        </Button>
      </div>
      <div className="CollegessearchBar">
        <TextField 
          label="Search College" 
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
        rows={filteredCollegesDataWithPlaceholder} 
        columns={columns}
        getRowId={(row) => row.id}
        
        
      />
      
      </div>
      </>
  );
};

export default CollegePage;  