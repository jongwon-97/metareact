import React from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import "./App.css";
import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/admin/UsersList";
import CourseList from "./pages/admin/CourseList";
import SessionList from "./pages/admin/SessionList";
import SessionDetail from "./pages/admin/SessionDetail";
import AttList from "./pages/admin/AttList"
import AttListDetail from "./pages/admin/AttListDetail";
import AttLog from "./pages/admin/AttLog";
import TrainList from "./pages/admin/TrainList";


import ManagerHeader from "./components/ManagerHeader";
import ManagerSideBar from "./components/ManagerSideBar";

import InstrHeader from "./components/InstrHeader";
import InstrSideBar from "./components/InstrSideBar";
import InstrDashboard from "./pages/instr/InstrDashboard";

import StudentHeader from "./components/StudentHeader";
import StudentSidebar from "./components/StudentSidebar";

import StudentDashboard from "./pages/student/StudentDashboard";

function Layout() {
  const location = useLocation();

  const isStudent = location.pathname.startsWith("/student");

  const getHeader = () => {
    if (location.pathname.startsWith("/admin")) return <AdminHeader />;
    if (location.pathname.startsWith("/manager")) return <ManagerHeader />;
    if (location.pathname.startsWith("/instr")) return <InstrHeader />;
    if (isStudent) return <StudentHeader />;
    return null; // 기본 헤더
  };

  const getSidebar = () => {
    if (location.pathname.startsWith("/admin")) return <AdminSideBar />;
    if (location.pathname.startsWith("/manager")) return <ManagerSideBar />;
    if (location.pathname.startsWith("/instr")) return <InstrSideBar />;
    if (isStudent) return <StudentSidebar />;
    return null; // 기본 사이드바
  };

  return (
    <div className={`app-container ${isStudent ? "student" : ""}`}>
      {getHeader()}
      <div className="content-container">
        {getSidebar()}
        <div className="main-content">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users/list" element={<UsersList />} />
            <Route path="/admin/KDT/list" element={<CourseList />} />
            <Route path="/admin/KDT/course/:courseId" element={<SessionList />} />
            <Route path="/admin/KDT/session/:sessionId" element={<SessionDetail />} />
            <Route path="/admin/KDT/:kdtSessionId/att/list" element={<AttList />} />
            <Route path="/admin/KDT/:kdtSessionId/att/detail/:kdtPartId" element={<AttListDetail />} />
            <Route path="/admin/KDT/:kdtSessionId/att/log/:kdtPartId" element={<AttLog />} />
            <Route path="/admin/KDT/:kdtSessionId/train/list" element={<TrainList />} />
            {/* Manager Routes */}  
            <Route path="/manager/dashboard" element={<Dashboard />} />
            {/* Instructor Routes */}
            <Route path="/instr/dashboard" element={<InstrDashboard />} />
            {/* Student Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/view">
      <Layout />
    </Router>
  );
}

export default App;