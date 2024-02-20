import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import api from "../../../../apiReference";
import "./Branches.css";
import { SearchIcon } from "lucide-react";

const Branches = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [filteredBranchesData, setFilteredBranchesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchBranchesData = async () => {
      try {
        const response = await api.get("/api/branch/getCompleteBranches");
        setBranchesData(response.data);
        setFilteredBranchesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBranchesData();
  }, []);

  const filterBranches = useCallback(() => {
    const filteredData = branchesData.filter(
      (branch) =>
        Object.values(branch).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        branch.branch_id.toString().includes(searchQuery) ||
        branch.branch_code.toString().includes(searchQuery)
    );
    setFilteredBranchesData(filteredData);
  }, [searchQuery, branchesData]);

  useEffect(() => {
    filterBranches();
  }, [filterBranches]);
  

  const columns = [
    { field: "branch_id", headerName: "Branch Id", width: 110 },
    { field: "course", headerName: "Course",width: 150  },
    { field: "branch", headerName: "Branch",width: 200  },
    { field: "branch_full_name", headerName: "Branch Full Name", width: 250 },
    {
      field: "branch_specialization",
      headerName: "Branch Specialization",
      width: 250,
    },
    { field: "branch_code", headerName: "Branch Code",width: 150  },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: () => (
        <Button
          component={Link}
          to="#"
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      ),
      width: 100,
    },
  ];

  const filteredBranchesDataWithPlaceholder = filteredBranchesData.map((row) =>
  Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      value === "" || value === null ? "Not Uploaded" : value,
    ])
  )
);

  return (
    <>
      <Typography className="BranchTitle" variant="h5">
        Branches
      </Typography>

      <div className="AddButton-SearchBar">
        <div className="addbutton">
          <Button
            component={Link}
            to="#"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        <div className="BranchessearchBar">
          <TextField
            label="Search Branches"
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
      <div
        className="container"
        style={{  marginLeft: "10px" }}
      >
        <DataGrid
          rows={filteredBranchesDataWithPlaceholder}
          columns={columns}
          getRowId={(row) => row.branch_id}
        />
      </div>
    </>
  );
};

export default Branches;
