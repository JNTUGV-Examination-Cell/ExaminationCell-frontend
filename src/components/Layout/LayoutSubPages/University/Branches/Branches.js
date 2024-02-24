import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import api from "../../../../apiReference";
import "./Branches.css";
import { SearchIcon } from "lucide-react";


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
        const sortedData = response.data.sort((a, b) => a.branch_id - b.branch_id);
        setBranchesData(sortedData);
        setFilteredBranchesData(sortedData);
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
      if (isNewRow) {
        const dataToSend = [row];
        console.log({ dataToSend });
        const response = await api.post('/api/branch/addBranches', dataToSend);
        console.log("New row added successfully:", response.data);
        row.isNew = false;
        console.log({ row });
        if (!filteredBranchesData.some(existingRow => existingRow.branch_id === row.branch_id)) {
          setFilteredBranchesData(prevData => [...prevData, row]);
        }
      } else {
        await api.put(`/api/branch/updateBranch/${id}`, row);
        console.log("Row updated successfully");
        console.log(row);
      }
      setFilteredBranchesData(prevData => {
        const updatedData = prevData
          .map(oldRow => (oldRow.branch_id === id ? { ...oldRow, ...row } : oldRow))
          .sort((a, b) => a.branch_id - b.branch_id);
        const editedRowIndex = updatedData.findIndex(item => item.branch_id === id);
        if (editedRowIndex > 0) {
          const editedRow = updatedData[editedRowIndex];
          updatedData.splice(editedRowIndex, 1);
          updatedData.unshift(editedRow);
        }
        return updatedData;
      });
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setEditRowId(null);
      setIsNewRow(false);
    }
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setIsNewRow(false);
  };


  const handleAddRow = async () => {
  const maxId = Math.max(...branchesData.map(row => row.branch_id));
  const newRowId = maxId + 1;
    const newRow = {
      branch_id: newRowId,
      course: "",
      branch: "",
      branch_full_name: "",
      branch_specialization: "",
      branch_code: "",
      isNew: true,
    };
    setFilteredBranchesData([newRow, ...filteredBranchesData]);
    setEditRowId(newRowId);
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
    const updatedRow = { ...row };
    for (const key in updatedRow) {
      if (updatedRow.hasOwnProperty(key) && (updatedRow[key] === "" || updatedRow[key] === null)) {
        updatedRow[key] = "Not Uploaded";
      }
    }
    return updatedRow;
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