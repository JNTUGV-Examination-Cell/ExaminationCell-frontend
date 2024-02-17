import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import api from "../../../../apiReference";
import "./Branches.css";
import { SearchIcon } from "lucide-react";
import { v4 as uuid } from 'uuid';


const Branches = () => {
  const [branchesData, setBranchesData] = useState([]);
  const [filteredBranchesData, setFilteredBranchesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [isNewRow, setIsNewRow] = useState(false);

  useEffect(() => {
    const fetchBranchesData = async () => {
      try {
        const response = await api.get("/api/branch/getCompleteBranches");
        setBranchesData(response.data);
        setFilteredBranchesData(response.data);
        // console.log("Fetched branches data:", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBranchesData();
  }, [searchQuery]);

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

  const handleEditClick = (id) => {
    setEditRowId(id);
    setIsNewRow(false);
  };

  const handleSaveClick = async (id, row) => {
    try {
      let dataToSend = [];
      // Send a request to update or add the data in the backend
      if (isNewRow) {
        dataToSend.push(row);
        const response = await api.post("/api/branch/addBranches", dataToSend);
        console.log("New row added successfully:", response.data);
        setFilteredBranchesData((prevData) => [...prevData, response.data]);
      } else {
        await api.put(`/api/branch/updateBranch/${id}`, row);
        console.log("Row updated successfully");
        console.log(row);
      }
      setFilteredBranchesData((prevData) =>
        prevData.map((oldRow) => (oldRow.branch_id === id ? { ...oldRow, ...row } : oldRow)))
    } catch (error) {
      console.error("Error saving data:", error);
      // Display an error message or handle any other error scenarios as needed
    } finally {
      // Reset editRowId to null to exit the edit mode
      setEditRowId(null);
      setIsNewRow(false);
    }
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setIsNewRow(false);
  };

  const handleAddRow = async() => {
    const newRow = {
      branch_id: "", // Set default values for the new row
      course: "",
      branch: "",
      branch_full_name: "",
      branch_specialization: "",
      branch_code: "",
      isNew: true,
    };
    setFilteredBranchesData([newRow, ...filteredBranchesData]);
    setEditRowId(newRow.branch_id);
    setIsNewRow(true);
  };

  const columns = [
    { field: "branch_id", headerName: "Branch Id", width: 100, editable: true },
    { field: "course", headerName: "Course", width: 150, editable: true },
    { field: "branch", headerName: "Branch", width: 200, editable: true },
    { field: "branch_full_name", headerName: "Branch Full Name", width: 250, editable: true },
    {
      field: "branch_specialization",
      headerName: "Branch Specialization",
      width: 220,
      editable: true,
    },
    { field: "branch_code", headerName: "Branch Code", width: 120, editable: true },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <div>
            {editRowId === params.row.branch_id ? (
              <>
                <Button variant="contained" color="primary" onClick={() => handleSaveClick(params.row.branch_id, params.row)}>
                  Save
                </Button>
                <span style={{ marginRight: '8px' }}></span>
                <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row.branch_id)}>
                Edit
              </Button>
            )}
          </div>
        );
      },
      width: 180,
    },
  ];


  const filteredBranchesDataWithPlaceholder = filteredBranchesData.map((row) => {
    if (row.isNew) {
      const newRowId = uuid();
      // For new rows, return the row as is since we want to display empty fields
      return { ...row, id: newRowId };
    } else {
      // For existing rows, map over the row's entries and replace empty values with "Not Uploaded"
      const updatedRow = Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          value === "" || value === null ? "Not Uploaded" : value,
        ])
      );
      return { ...row, id: row.branch_id };

    }
  });

  return (
    <>
      <Typography className="BranchTitle" variant="h5">
        Branches
      </Typography>

      <div className="AddButton-SearchBar">
        <div className="addbutton">
          <Button variant="contained" color="primary" onClick={handleAddRow}>
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
      <div className="branch-container" style={{ marginLeft: "10px" }}>
        <DataGrid
          rows={filteredBranchesDataWithPlaceholder}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.branch_id}
          isCellEditable={(params) => editRowId === params.id}
          onEditCellChange={(params) => {
            const updatedData = filteredBranchesData.map((row) =>
              row.branch_id === params.id ? { ...row, [params.field]: params.props.value } : row
            );
            setFilteredBranchesData(updatedData);
          }}
        />
      </div>
    </>
  );
};  

export default Branches;
