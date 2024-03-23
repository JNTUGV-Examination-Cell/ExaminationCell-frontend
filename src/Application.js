import React from "react";
import LoginPage from "./components/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Random from "./components/Home/Random";
import Batchesmain from "./components/Batches/Batchesmain";
import Layout from "./components/Layout/Layout";
import ManageBatches from "./components/Batches/BatchesSubPages/ManageBatches";
import CollegePage from "./components/Layout/LayoutSubPages/CollegeSection/CollegePage";
import ProfilePage from "./components/Layout/LayoutSubPages/ProfileSection/ProfilePage";
import HomePage from "./components/Layout/LayoutSubPages/HomeSection/HomePage";
import PortalNotification from "./components/Layout/LayoutSubPages/PortalNotification/PortalNotification";
import Staff from "./components/Layout/LayoutSubPages/Staff/Staff";
import Sets from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/Sets";
import MarkAbsents from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/SetForParticularExam/MarkAbsents";
import MarkMalpractice from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/SetForParticularExam/MarkMalpractice";
import StudentApplicationForm from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/StudentApplication/StudentApplicationForm";
import Examdata from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Exams/Examdata";
import ExamSets from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/ExamSets/ExamSets";
import ManageSubjects from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/ExamSets/ManageSubjects";
import InternalMarks from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/InternalMarks/InternalMarks";
import FinalListOfExamination from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/FinalListOfExamination/FinalListOfExamination";
import SetForParticularExam from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/Sets/SetForParticularExam/SetForParticularExam";
import ExaminationSubPage from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/ExaminationSubPage";
import CondonationandDetention from "./components/Layout/LayoutSubPages/Examination/ExaminationSubPages/CondonationandDetention/CondonationandDetention";
import StudentPhotosButton from "./components/Batches/StudentPhotosButton";
import RegulationPage from "./components/Layout/LayoutSubPages/Regulations/Regulations";
import AddRegulationPage from "./components/Layout/LayoutSubPages/Regulations/RegulationsSubPages/AddRegulations";
import Examnotification from "./components/Layout/LayoutSubPages/ExamNotification/Examnotification";
import Branches from "./components/Layout/LayoutSubPages/University/Branches/Branches";
import Subjects from "./components/Layout/LayoutSubPages/University/Subjects/Subjects";
import BranchesAddEdit from "./components/Layout/LayoutSubPages/University/BranchesAddEdit/BranchesAddEdit";
import Districts from "./components/Layout/LayoutSubPages/University/Districts/Districts";
import Courses from "./components/Layout/LayoutSubPages/University/Courses/Courses";
import CollegeDetails from "./components/Layout/LayoutSubPages/CollegeSubSection/CollegeDetails";
import Students from "./components/Layout/LayoutSubPages/StudentsSection/Students";
import StudentProfile from "./components/Layout/LayoutSubPages/StudentsSection/components/StudentProfile";

const Application = () => {
  return (
    <div>
      <Routes>
        <Route path="/layout" element={<Layout />}>
          <Route path="students" element={<Students />} />
          <Route path="students/:studentId" element={<StudentProfile />} />
          <Route
            path="CondonationandDetention"
            element={<CondonationandDetention />}
          />
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
          <Route path="InternalMarks" element={<InternalMarks />} />
          <Route
            path="studentexamapplication"
            element={<StudentApplicationForm />}
          />
          <Route
            path="FinalListOfExamination"
            element={<FinalListOfExamination />}
          />
          <Route
            path="CondonationandDetention"
            element={<CondonationandDetention />}
          />
          <Route
            path="examdata/manageexamination/studentexamapplication"
            element={<StudentApplicationForm />}
          />
          <Route
            path="FinalListOfExamination"
            element={<FinalListOfExamination />}
          />
          <Route
            path="examdata/manageexamination/CondonationandDetention"
            element={<CondonationandDetention />}
          />
          <Route path="examdata/manageexamination/Sets" element={<Sets />} />
          <Route
            path="examdata/manageexamination/FinalListOfExamination"
            element={<FinalListOfExamination />}
          />
          <Route
            path="examdata/manageexamination/InternalMarks"
            element={<InternalMarks />}
          />
          <Route
            path="examdata/manageexamination/FinalListOfExamination"
            element={<FinalListOfExamination />}
          />
          <Route
            path="examdata/manageexamination/CondonationandDetention"
            element={<CondonationandDetention />}
          />
          <Route path="examdata/manageexamination/FinalListOfExamination" element={<FinalListOfExamination />} />
          <Route path="examdata/manageexamination/InternalMarks" element={<InternalMarks />} />
          <Route path="examdata/manageexamination/FinalListOfExamination" element={<FinalListOfExamination />} />
          <Route path="examdata/manageexamination/CondonationandDetention" element={<CondonationandDetention />} />

          <Route
            path="examdata/manageexamination/studentexamapplication"
            element={<StudentApplicationForm />}
          />
          <Route
            path="examdata/manageexamination/FinalListOfExamination"
            element={<FinalListOfExamination />}
          />
          <Route path="regulations/addregulation" element={<AddRegulationPage />} />
          <Route path="regulations" element={<RegulationPage />} />
          <Route path="districts" element={<Districts />} />
          <Route path="courses" element={<Courses />} />
          <Route path="branches" element={<Branches/>}/>
          <Route path="subjects" element={<Subjects />} />
          <Route path="colleges" element={<CollegePage />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="homepage" element={<HomePage />} />
          <Route path="batches" element={<Batchesmain />} />
          <Route path="batches/managebatches" element={<ManageBatches />} />
          <Route
            path="batches/studentphotos"
            element={<StudentPhotosButton />}
          />
          <Route path="notifications" element={<PortalNotification />} />
          <Route path="staff" element={<Staff />} />
          <Route path="examnotifications" element={<Examnotification />} />
          <Route path="InternalMarks" element={<InternalMarks />} />
          <Route
            path="CollegeDetails"
            element={<CollegeDetails />}
          />
          <Route
            path="examdata/manageexamination/Sets/examsets/setforparticularexam/markabsent"
            element={<MarkAbsents />}
          />
          <Route
            path="examdata/manageexamination/Sets/examsets/setforparticularexam/markmalpractice"
            element={<MarkMalpractice />}
          />
          <Route
            path="examdata/manageexamination/Sets/examsets"
            element={<ExamSets />}
          />
          <Route path="managesubject" element={<ManageSubjects />} />
          <Route
            path="examdata/manageexamination/Sets/examSet/setforparticularexam"
            element={<SetForParticularExam />}
          />
          <Route path="examdata" element={<Examdata />} />
          <Route path="examdata/manageexamination" element={<ExaminationSubPage />} />
          <Route path="branches/branchesAdd" element={<BranchesAddEdit/>} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/random" element={<Random />} />
        <Route path="/" element={<LoginPage />} />

      </Routes>
    </div>
  );
};

export default Application;
