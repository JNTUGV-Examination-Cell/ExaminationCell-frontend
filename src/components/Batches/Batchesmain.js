import { Link } from "react-router-dom";
import Boxdata from "./Boxdata";
import "./Batchesmain.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  COURSE_OPTIONS,
  REGULATION_OPTIONS,
} from "../../constants/AllConstants";

const Batchesmain = () => {
  const loginUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const collegeCode = loginUserDetails.collegeCode;

  const [batchesData, setBatchesData] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedRegulations, setSelectedRegulations] = useState([]);

  const batches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/batch/getAllBatches/${collegeCode}`
      );
      setBatchesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await batches();
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collegeCode]);

  const handleProgramSelect = (selectedOption) => {
    const selectedPrograms = selectedOption.map((option) => option.value);
    setSelectedPrograms(selectedPrograms);
  };

  const handleRegulationSelect = (selectedOption) => {
    const selectedRegulations = selectedOption.map((option) => option.value);
    setSelectedRegulations(selectedRegulations);
  };

  const filteredBatchesData = selectedPrograms.length > 0 && selectedRegulations.length > 0
  ? batchesData.filter((batch) => {
      return (
        selectedPrograms.includes(batch.course) &&
        selectedRegulations.includes(batch.regulation)
      );
    })
  : selectedPrograms.length > 0
  ? batchesData.filter((batch) => selectedPrograms.includes(batch.course))
  : selectedRegulations.length > 0
  ? batchesData.filter((batch) => selectedRegulations.includes(batch.regulation))
  : batchesData;

  return (
    <div>
      <Typography variant="h5">Batches</Typography>
      <div style={{ display: "flex", gap: 5 }}>
        <Button
          component={Link}
          to={"/layout/batches/studentphotos"}
          variant="contained"
        >
          Student photos
        </Button>
        <div style={{ display: "flex", gap: 5 }}>
          <Select
            placeholder="Select Course"
            options={COURSE_OPTIONS}
            onChange={handleProgramSelect}
            isMulti
          />
          <Select
            placeholder="Select Regulations"
            options={REGULATION_OPTIONS}
            onChange={handleRegulationSelect}
            isMulti
          />
        </div>
      </div>
      <Boxdata batchesData={filteredBatchesData} />
    </div>
  );
};

export default Batchesmain;


function sum(a){
  return a;
}

console.log(sum(5));