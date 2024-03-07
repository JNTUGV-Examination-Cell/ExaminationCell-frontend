import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import api from "../../../../apiReference";
import "./Subjects.css";
import { SearchIcon } from "lucide-react";
import { SnackbarProvider, useSnackbar } from 'notistack';

const Subjects = () => {
  const [subjectsData, setSubjectsData] = useState([]);
  const [filteredSubjectsData, setFilteredSubjectsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [isNewRow, setIsNewRow] = useState(false);

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const response = await api.get("api/course/fetchAllSubjects");
        const sortedData = response.data.sort((a, b) => a.sub_id - b.sub_id);
        setSubjectsData(sortedData);
        setFilteredSubjectsData(sortedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjectsData();
  }, [searchQuery]);

  const filterSubjects = useCallback(() => {
    const filteredData = subjectsData.filter(
      (subject) =>
        Object.values(subject).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        subject.sub_id.toString().includes(searchQuery) ||
        subject.subject_code.toString().includes(searchQuery)
    );
    setFilteredSubjectsData(filteredData);
  }, [searchQuery, subjectsData]);

  useEffect(() => {
    filterSubjects();
  }, [filterSubjects]);

  const { enqueueSnackbar } = useSnackbar(); 

  const handleEditClick = (sub_id) => {
    setEditRowId(sub_id);
    setIsNewRow(false);
  };

  const handleSaveClick = async (sub_id, row) => {
    try {
      if (isNewRow) {
        const dataToSend = [row];
        const response = await api.post('/api/course/addSubject', dataToSend);
        console.log("New row added successfully:", response.data);
        row.isNew = false;
        console.log({ row });
        if (!filteredSubjectsData.some(existingRow => existingRow.sub_id === row.sub_id)) {
          setFilteredSubjectsData(prevData => [...prevData, row]);
        }
        enqueueSnackbar("New row added successfully", { variant: 'success' });
      } else {
        await api.put(`/api/course/updateSubject/${sub_id}`, row);
        console.log("Row updated successfully");
        console.log(row);
        enqueueSnackbar("Row updated successfully", { variant: 'success' }); 
      }
      setFilteredSubjectsData(prevData => {
        const updatedData = prevData
          .map(oldRow => (oldRow.sub_id === sub_id ? { ...oldRow, ...row } : oldRow))
          .sort((a, b) => a.sub_id - b.sub_id);
        const editedRowIndex = updatedData.findIndex(item => item.sub_id === sub_id);
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
    const maxId = Math.max(...subjectsData.map(row => row.sub_id));
    const newRowId = maxId + 1;
    const newRow = {
      sub_id: newRowId,
      regulation_courses_set_id: "",
      regulation_course_title: "",
      branch_id: "",
      subject_code: "",
      subject_name: "",
      course: "",
      external_pass_mark:"",
      total_pass_mark: "",
      total_external_mark: "",
      subject_total_mark: "",
      credits: "",
      subject_type: "",
      subject_status: "",
      isNew: true,
    };
    setFilteredSubjectsData([newRow, ...filteredSubjectsData]);
    setEditRowId(newRowId);
    setIsNewRow(true);
  };

  const columns = [
    { field: "sub_id", headerName: "Sub Id", width: 60, editable: true },
    { field: "regulation_courses_set_id", headerName: "Regulation Course Set ID", width: 100, editable: true },
    { field: "regulation_course_title", headerName: "Regulation Course Title", width: 150, editable: true },
    { field: "branch_id", headerName: "Branch Id", width: 80, editable: true },
    {
      field: "subject_code",
      headerName: "Subject Code",
      width: 100,
      editable: true,
    },
    { field: "subject_name", headerName: "Subject Name", width: 100, editable: true },
    { field: "course", headerName: "Course", width: 80, editable: true },
    { field: "external_pass_mark", headerName: "External Pass Mark", width: 100, editable: true },
    { field: "total_pass_mark", headerName: "Total Pass Mark", width: 100, editable: true },
    { field: "total_external_mark", headerName: "Total External Mark", width: 120, editable: true },
    { field: "subject_total_mark", headerName: "Subject Total Mark", width: 100, editable: true },
    { field: "credits", headerName: "Credits", width: 60, editable: true },
    { field: "subject_type", headerName: "Subject Type", width: 100, editable: true },
    { field: "subject_status", headerName: "Subject Status", width: 120, editable: true },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {
        return (
          <div>
            {editRowId === params.row.sub_id ? (
              <>
                <Button variant="contained" color="primary" onClick={() => handleSaveClick(params.row.sub_id, params.row)}>
                  Save
                </Button>
                <span style={{ marginRight: '8px' }}></span>
                <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => handleEditClick(params.row.sub_id)}>
                Edit
              </Button>
            )}
          </div>
        );
      },
      width: 180,
    },
  ];

  const filteredSubjectsDataWithPlaceholder = filteredSubjectsData.map((row) => {
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

  // const handleCloseSnackbar = () => {
  //   setSnackbarOpen(false);
  // };

  return (
    <>
      <Typography className="SubjectTitle" variant="h4">
        Subjects
      </Typography>

      <div className="AddButton-Upload-SearchBar">
        <div className="adduploadButtons">
          <Button variant="contained" color="primary" onClick={handleAddRow}>
            Add
          </Button>
        </div>
        <div className="SubjectssearchBar">
          <TextField
            label="Search Subjects"
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
      <div className="subject-container" style={{ marginLeft: "10px" }}>
        <DataGrid
          rows={filteredSubjectsDataWithPlaceholder}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.sub_id}
          isCellEditable={(params) => editRowId === params.row.sub_id}
          onEditCellChange={(params) => {
            const updatedData = filteredSubjectsData.map((row) =>
              row.sub_id === params.id ? { ...row, [params.field]: params.props.value } : row
            );
            setFilteredSubjectsData(updatedData);
          }}
        />
      </div>
    </>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Subjects />
    </SnackbarProvider>
  );
}