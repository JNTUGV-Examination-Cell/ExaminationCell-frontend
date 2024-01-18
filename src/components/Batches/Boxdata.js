import React, { Component } from "react";
import Records from "./example.json";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./Batchesmain.css";
import { Link } from "react-router-dom";

class Boxdata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPrograms: [],
      selectedRegulations: [],
    };
  }

  handleProgramSelect = (event, selectedOption) => {
    const selectedPrograms = selectedOption.map((option) => option.value);
    this.setState({ selectedPrograms });
  };

  handleRegulationSelect = (event, selectedOption) => {
    const selectedRegulations = selectedOption.map((option) => option.value);
    this.setState({ selectedRegulations });
  };

  render() {
    const { selectedPrograms, selectedRegulations } = this.state;
    const courseOptions = [
      { label: "B.Tech", value: "btech" },
      { label: "M.Tech", value: "mtech" },
      { label: "Pharm.D", value: "Pharm.D" },
      { label: "M.Pharmacy", value: "M.Pharmacy" },
      { label: "MBA", value: "MBA" },
      { label: "MCA", value: "mca" },
    ];

    const regulationoptions = [
      { label: "R13", value: "R13" },
      { label: "R16", value: "R16" },
      { label: "R19", value: "R19" },
      { label: "R20", value: "R20" },
      { label: "R23", value: "R23" },
    ];

    const filteredRecords = Records.filter((record) => {
      const regLower = record.reg.toLowerCase();

      const programFilter =
        selectedPrograms.length === 0 ||
        selectedPrograms.some((option) =>
          regLower.includes(option.toLowerCase())
        );
      const regulationFilter =
        selectedRegulations.length === 0 ||
        selectedRegulations.some((option) =>
          regLower.includes(option.toLowerCase())
        );
      return programFilter && regulationFilter;
    });

    return (
      <div className="BatchesContainer">
        <div className="BatchesBlocks">
          {filteredRecords.map((record) => (
            <div className="Batch" key={record.batch}>
              <div className="Batchname"> Batch</div>
              <div className="Batchnumber">{record.batch}</div>
              <div className="Batchregulation">{record.reg}</div>
              <hr style={{ width: "80%", border: "0.3px solid #9BA5B7" }} />
              <Link to="/layout/batches/managebatches" style={{textDecoration:"none"}}><button className='Batchbutton'>Manage</button></Link>

              <br></br>
              <button className="Batchbutton2">Years and Terms</button>
            </div>
          ))}
        </div>

        <div className="RegFilterContainer">
          <Autocomplete
            multiple
            id="program-course"
            options={courseOptions}
            className="filter"
            value={courseOptions.filter((option) =>
              selectedPrograms.includes(option.value)
            )}
            onChange={this.handleProgramSelect}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Select Course" />
            )}
          />
        </div>
        <div className="RFilterContainer">
          <Autocomplete
            multiple
            id="program-regulations"
            options={regulationoptions}
            className="filter"
            value={regulationoptions.filter((option) =>
              selectedRegulations.includes(option.value)
            )}
            onChange={this.handleRegulationSelect}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Select Regulation" />
            )}
          />
        </div>
      </div>
    );
  }
}

export default Boxdata;