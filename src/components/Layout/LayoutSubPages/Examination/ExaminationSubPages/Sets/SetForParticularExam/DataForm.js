import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import personDetailsData from "./personDetails";
import * as XLSX from "xlsx";

function DataForm() {
  const [personDetails, setPersonDetails] = useState(personDetailsData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedRow, setEditedRow] = useState({
    id: null,
    rollNumber: "",
    name: "",
    year: "",
    branch: "",
    course: "",
  });

  const handleDataForm = () => {
    const dataForDownload = personDetails.map((person, index) => ({
      id: index + 1,
      rollNumber: person.rollNumber,
      name: person.name,
      year: person.year,
      branch: person.branch,
      course: person.course,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForDownload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "personDetails.xlsx");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditedRow({
      id: null,
      rollNumber: "",
      name: "",
      year: "",
      branch: "",
      course: "",
    });
    setSelectedRow(null);
  };

  const handleSaveChanges = () => {
    let updatedPersonDetails;

    if (editedRow.id !== null) {
      // Editing existing row
      updatedPersonDetails = personDetails.map((person) =>
        person.id === editedRow.id ? editedRow : person
      );
    } else {
      // Adding new row
      const newPerson = {
        ...editedRow,
        id: personDetails.length + 1,
      };
      updatedPersonDetails = [...personDetails, newPerson];
    }

    setPersonDetails(updatedPersonDetails);
    setOpenModal(false);
  };

  const handleEditRow = (id) => {
    const selectedPerson = personDetails.find((person) => person.id === id);
    setSelectedRow(selectedPerson);
    setEditedRow(selectedPerson);
    setOpenModal(true);
  };

  const handleDeleteRow = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this row?");
    if (confirmation) {
      setPersonDetails(personDetails.filter((person) => person.id !== id));
    }
  };

  const handleAddRow = () => {
    setEditedRow({
      id: null,
      rollNumber: "",
      name: "",
      year: "",
      branch: "",
      course: "",
    });
    setOpenModal(true);
  };

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  const columns = [
    { field: "rollNumber", headerName: "Roll Number", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "branch", headerName: "Branch", width: 150 },
    { field: "course", headerName: "Course", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEditRow(params.row.id)}
          style={{ marginRight: 8 }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDeleteRow(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div>
        <h1>Data Form - R111223 - B.Tech I Year I Sem R20 Reg February 2023 - R201103 - ENGINEERING PHYSICS - 03 March 2023 10:00 AM</h1>
      </div>
      <br />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <Button variant="contained" onClick={handleAddRow} style={{ marginRight: 10 }}>
          Add Row
        </Button>

        <Button variant="contained" onClick={handleDataForm}>
          Download D Form
        </Button>
      </div>

      <div style={{ height: 500, width: "100%", marginTop: 20 }}>
        <DataGrid rows={personDetails} columns={columns} pageSize={5} />
      </div>

      <Modal
  open={openModal}
  onClose={handleCloseModal}
  style={{
    zIndex: 1500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <div style={{ padding: 20, backgroundColor: "#ffffff", borderRadius: 8, width: "90%", maxWidth: 500 }}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Roll Number"
        variant="outlined"
        name="rollNumber"
        value={editedRow.rollNumber}
        onChange={handleTextFieldChange}
        style={{ marginBottom: 10 }}
        fullWidth
      />
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={editedRow.name}
        onChange={handleTextFieldChange}
        style={{ marginBottom: 10 }}
        fullWidth
      />
      <TextField
        label="Year"
        variant="outlined"
        name="year"
        value={editedRow.year}
        onChange={handleTextFieldChange}
        style={{ marginBottom: 10 }}
        fullWidth
      />
      <TextField
        label="Branch"
        variant="outlined"
        name="branch"
        value={editedRow.branch}
        onChange={handleTextFieldChange}
        style={{ marginBottom: 10 }}
        fullWidth
      />
      <TextField
        label="Course"
        variant="outlined"
        name="course"
        value={editedRow.course}
        onChange={handleTextFieldChange}
        style={{ marginBottom: 10 }}
        fullWidth
      />
    </div>
    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" onClick={handleSaveChanges} style={{ marginRight: 10 }}>
        Save Changes
      </Button>
      <Button variant="contained" onClick={handleCloseModal}>
        Cancel
      </Button>
    </div>
  </div>
</Modal>



    </div>
  );
}

export default DataForm;
