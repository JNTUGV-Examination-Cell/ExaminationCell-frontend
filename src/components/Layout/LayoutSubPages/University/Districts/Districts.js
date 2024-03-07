import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Corrected import for SearchIcon
import api from "../../../../apiReference";
import AddDistrict from "./utils/AddDistrict";

const Districts = () => {
  const [districtsData, setDistrictsData] = useState([]);
  const [filteredDistrictsData, setFilteredDistrictsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDistrictsData = async () => {
      try {
        const response = await api.get("api/district/getDistricts");
        setDistrictsData(response.data.data);
        setFilteredDistrictsData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistrictsData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const filteredData = districtsData.filter((district) =>
        district.district_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDistrictsData(filteredData);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving edited data:", filteredDistrictsData);
      await api.post("api/district/updateDistricts", {
        data: filteredDistrictsData,
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ display: "flex" }}>
        <TextField
          label="Search District"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "20px" }}>
        Districts
      </Typography>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <AddDistrict
        open={open}
        handleClose={() => setOpen(false)}
        text="Add"
        districtsData={districtsData}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredDistrictsData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          
          slots={{
            toolbar: CustomToolbar,
          }}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </>
  );
};

export default Districts;
