import React from "react";
import LoginPage from "./components/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Random from "./components/Home/Random";
import Batchesmain from "./components/Batches/Batchesmain";
import Layout from "./components/Layout/Layout";
import ManageBatches from "./components/Batches/BatchesSubPages/ManageBatches";
import UploadStudentDetails from "./components/Batches/BatchesSubPages/UploadStudentDetails";
import CollegePage from "./components/Layout/LayoutSubPages/CollegeSection/CollegePage";
import ProfilePage from "./components/Layout/LayoutSubPages/ProfileSection/ProfilePage";
import HomePage from "./components/Layout/LayoutSubPages/HomeSection/HomePage";
import PortalNotification from "./components/Layout/LayoutSubPages/PortalNotification/PortalNotification";
import Staff from "./components/Layout/LayoutSubPages/Staff/Staff";
import StudentApplicationForm from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/StudentApplication/StudentApplicationForm";
import Examdata from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Exams/Examdata";
<<<<<<< HEAD

=======
import FinalListOfExamination from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/FinalListOfExamination/FinalListOfExamination";
>>>>>>> ea49bf98f28b5ce282324b4241640a706f051a02
const Application = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/admin/batches/managebatches/uploadstudents"
          element={<UploadStudentDetails />}
        />
        <Route
          path="/admin/batches/managebatches"
          element={<ManageBatches />}
        />
        <Route path="/admin/batches" element={<Batchesmain />} />
        <Route path="/layout" element={<Layout />}>
<<<<<<< HEAD
          <Route path="studentexamapplication" element={<StudentApplicationForm />} />
=======
        <Route path="FinalListOfExamination" element={<FinalListOfExamination />} />
>>>>>>> ea49bf98f28b5ce282324b4241640a706f051a02
          <Route path="colleges" element={<CollegePage />} />
          <Route path="examdata" element={<Examdata />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="batches" element={<Batchesmain />} />
          <Route path="notifications" element={<PortalNotification />} />
          <Route path="staff" element={<Staff />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default Application;
