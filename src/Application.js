import React from "react";
import LoginPage from "./components/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Random from "./components/Home/Random";
import Batchesmain from "./components/Batches/Batchesmain";
import Layout from "./components/Layout/Layout";

const Application = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/batches" element={<Batchesmain />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default Application;
