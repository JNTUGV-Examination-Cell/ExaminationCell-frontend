import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import api from "../../../../apiReference";
import "./AddRegulations.css";
const AddRegulations = () => {
  const [formData, setFormData] = useState({
    regulation_id: "",
    regulation: "",
    regulation_start_year: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    console.log(formData);
    try {
      const response = await api.post("/api/course/addRegulation", formData);
      if (response.status === 200) {
        console.log("Regulation added successfully");
      } else {
        console.error("Failed to add regulation");
      }
    } catch (error) {
      console.error("Error adding/ updating regulation:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="page-heading">Add Regulation</h2>
        <form className="form-section">
          <div className="form">
            <label htmlFor="regulations">Regulation:</label>
            <div className="underline-dropdown">
              <input
                type="text"
                id="regulation"
                name="regulation"
                value={formData.regulation}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form">
            <label htmlFor="regulation_start_year">Regulation Start Year</label>
            <div className="underline">
              <input
                type="text"
                id="regulation_start_year"
                name="regulation_start_year"
                value={formData.regulation_start_year}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="update-button">
            <Button
              variant="contained"
              style={{ height: 30 }}
              onClick={handleFormSubmit}
              component={Link}
              to="/layout/regulations"
              className="button"
            >
              Add <span>&#8594;</span>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRegulations;
