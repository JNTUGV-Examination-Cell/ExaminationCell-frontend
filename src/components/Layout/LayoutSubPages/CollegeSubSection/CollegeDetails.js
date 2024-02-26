import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import api from '../../../apiReference';
import "./bulkcolleges.css"; 

const Colleges = () => {
  const [collegesData, setCollegesData] = useState([]);
  const [filteredCollegesData, setFilteredCollegesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [isNewRow, setIsNewRow] = useState(false);

  useEffect(() => {
    const fetchCollegesData = async () => {
      try {
        const response = await api.get("/api/college/fetchColleges");
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setCollegesData(sortedData);
        setFilteredCollegesData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCollegesData();
  }, [searchQuery]);

  const filterColleges = useCallback(() => {
    const filteredData = collegesData.filter(
      (college) =>
        Object.values(college).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        college.id.toString().includes(searchQuery) ||
        college.college_name.toString().includes(searchQuery) ||
        college.college_code.toString().includes(searchQuery)
    );
    setFilteredCollegesData(filteredData);
  }, [searchQuery, collegesData]);

  useEffect(() => {
    filterColleges();
  }, [filterColleges]);

  const { enqueueSnackbar } = useSnackbar();

  const handleEditClick = (id) => {
    setEditRowId(id);
    setIsNewRow(false);
  };

  const handleSaveClick = async (id, row) => {
    try {
      if (isNewRow) {
        const dataToSend = [row];
        console.log({ dataToSend });
        const response = await api.post('/api/college/addColleges', dataToSend);
        console.log("New row added successfully:", response.data);
        row.isNew = false;
        console.log({ row });
        if (!filteredCollegesData.some(existingRow => existingRow.id === row.id)) {
          setFilteredCollegesData(prevData => [...prevData, row]);
        }
        enqueueSnackbar("New college added successfully", { variant: 'success' });
      } else {
        await api.put(`/api/college/updatecolleges`, row);
        console.log("Row updated successfully");
        console.log(row);
        enqueueSnackbar("Row updated successfully", { variant: 'success' });
      }
      setFilteredCollegesData(prevData => {
        const updatedData = prevData
          .map(oldRow => (oldRow.id === id ? { ...oldRow, ...row } : oldRow))
          .sort((a, b) => a.id - b.id);
        const editedRowIndex = updatedData.findIndex(item => item.id === id);
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
    const maxId = Math.max(...collegesData.map(row => row.id));
    const newRowId = maxId + 1;
    const newRow = {
      id: newRowId,
      college_name: "",
      college_code: "",
      district: "",
      college_type: "",
      address: "",
      pincode: "",
      college_status: "",
      isNew: true,
    };
    setFilteredCollegesData([newRow, ...filteredCollegesData]);
    setEditRowId(newRowId);
    setIsNewRow(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    { field: "college_name", headerName: "College Name", width: 200, editable: true },
    { field: "college_code", headerName: "College Code", width: 150, editable: true },
    { field: "district", headerName: "District", width: 150, editable: true },
    { field: "college_type", headerName: "College Type", width: 150, editable: true },
    { field: "address", headerName: "Address", width: 250, editable: true },
    { field: "pincode", headerName: "Pincode", width: 120, editable: true },
    { field: "college_status", headerName: "College Status", width: 150, editable: true },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <div>
            {editRowId === params.row.id ? (
              <>
                <Button variant="contained" color="primary" onClick={() => handleSaveClick(params.row.id, params.row)}>
                  Save
                </Button>
                <span style={{ marginRight: '8px' }}></span>
                <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row.id)}>
                Edit
              </Button>
            )}
          </div>
        );
      },
      width: 180,
    },
  ];

  const filteredCollegesDataWithPlaceholder = filteredCollegesData.map((row) => {
    if (row.isNew) {
      return { ...row };
    } else {
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          key,
          value === "" || value === null ? "Not Uploaded" : value,
        ])
      );
      return { ...row };
    }
  });

  return (
    <>
      <Typography className="CollegesTitle" variant="h5">
        Colleges
      </Typography>

      <div className="AddButton-SearchBar">
        <div className="addbutton">
          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Add
          </Button>
        </div>
        <div className="CollegessearchBar">
          <TextField
            label="Search Colleges"
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
      <div className="colleges-container" style={{ marginLeft: "10px" }}>
        <DataGrid
          rows={filteredCollegesDataWithPlaceholder}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          isCellEditable={(params) => editRowId === params.id}
          onEditCellChange={(params) => {
            const updatedData = filteredCollegesData.map((row) =>
              row.id === params.id ? { ...row, [params.field]: params.props.value } : row
            );
            setFilteredCollegesData(updatedData);
          }}
        />
      </div>
    </>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Colleges />
    </SnackbarProvider>
  );
}
