import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import api from "../../../../apiReference";
import AddDistrict from "./utils/AddDistrict";

const Districts = () => {
  const [districtsData, setDistrictsData] = useState([]);
  const [filteredDistrictsData, setFilteredDistrictsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRowId, setEditRowId] = useState(null);

  const [newDistrictData, setNewDistrictData] = useState({
    district_id: "",
    district_name: "",
    district_slug: "",
  });

  const handleSearch = () => {
    const filteredData = districtsData.filter((district) =>
      district.district_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDistrictsData(filteredData);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDistrict = () => {
    console.log("Adding district:", newDistrictData);
    setNewDistrictData({
      district_id: "",
      district_name: "",
      district_slug: "",
    });
    handleCloseModal();
  };
  useEffect(() => {
    const fetchDistrictsData = async () => {
      try {
        const response = await api.get("api/district/getDistricts");

        setDistrictsData(response.data.data);
        setFilteredDistrictsData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistrictsData();
  });

  const columns = [
    { field: "district_id", headerName: "District Id", width: 200 },
    {
      field: "district_name",
      headerName: "District Name",
      width: 200,
      editable: true,
    },
    {
      field: "district_slug",
      headerName: "District Slug",
      width: 200,
      editable: true,
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    console.log("Saving edited data:", filteredDistrictsData);
    // await api.post("api/district/updateDistricts", { data: filteredDistrictsData });
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ display: "flex" }}>
        <div style={{ display: "flex", gap: 2 }}>
          <div>
            <TextField
              label="Search District"
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
              onClick={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }
  return (
    <>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "20px" }}>
        Districts
      </Typography>
      <Button onClick={handleOpen}>Add</Button>
      <AddDistrict
        open={open}
        handleClose={handleClose}
        text="Add"
        districtsData={districtsData}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <div>
          <TextField
            label="Search District"
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
            onClick={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSave} color="primary">
          Save
        </Button> */}
      </div>
      <div className="w-50" style={{ maxWidth: "100%" }}>
        <DataGrid
          rows={filteredDistrictsData}
          columns={columns}
          getRowId={(row) => row.district_id}
          isCellEditable={(params) => params.id}
          onEditCellChange={(params) => {
            const updatedData = filteredDistrictsData.map((row) =>
              row.district_id === params.id
                ? { ...row, [params.field]: params.props.value }
                : row
            );
            setFilteredDistrictsData(updatedData);
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};

export default Districts;
