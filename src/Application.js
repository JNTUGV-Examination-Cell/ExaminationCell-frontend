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
import Sets from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/Sets";
import MarkAbsents from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/MarkAbsents";
import MarkMalpractice from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/MarkMalpractice";
import StudentApplicationForm from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/StudentApplication/StudentApplicationForm";
import Examdata from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Exams/Examdata";
import ExamSets from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/ExamSets/ExamSets";
import ManageSubjects from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/ExamSets/ManageSubjects";
import InternalMarks from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/InternalMarks/InternalMarks";
import FinalListOfExamination from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/FinalListOfExamination/FinalListOfExamination";

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
          <Route path="Sets" element={<Sets />} />
          <Route path="InternalMarks" element={<InternalMarks />} />
          <Route
            path="studentexamapplication"
            element={<StudentApplicationForm />}
          />
          <Route
            path="FinalListOfExamination"
            element={<FinalListOfExamination />}
          />
          <Route path="/Sets" element={<Sets />} />
          <Route path="colleges" element={<CollegePage />} />
          <Route path="examdata" element={<Examdata />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="batches" element={<Batchesmain />} />
          <Route path="notifications" element={<PortalNotification />} />
          <Route path="staff" element={<Staff />} />
          <Route path="markabsent" element={<MarkAbsents />} />
          <Route path="markmalpractice" element={<MarkMalpractice />} />
          <Route path="examsets" element={<ExamSets />} />
          <Route path="managesubject" element={<ManageSubjects />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default Application;
