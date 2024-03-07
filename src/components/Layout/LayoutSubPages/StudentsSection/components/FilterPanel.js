import Select from "react-select";
import React from "react";
import {
    COLLEGES_LIST,
  COURSE_OPTIONS,
  REGULATION_OPTIONS,
} from "../../../../../constants/AllConstants";

const FilterPanel = () => {
  return (
    <div style={{display: "flex", gap: 5}}>
      <Select
        placeholder="Select Course"
        options={COURSE_OPTIONS}
        // onChange={handleProgramSelect}
        isMulti
      />
      <Select
        placeholder="Select Regulations"
        options={REGULATION_OPTIONS}
        // onChange={handleRegulationSelect}
        isMulti
      />
      <Select
        placeholder="Select College of the student"
        options={COLLEGES_LIST}
        // onChange={handleRegulationSelect}
        styles={{width: "100px"}}
        isMulti
      />
    </div>
  );
};

export default FilterPanel;
