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

import ManagerHeader from "./components/ManagerHeader";
import ManagerSideBar from "./components/ManagerSideBar";
function Layout() {
  const location = useLocation();

  const getHeader = () => {
    if (location.pathname.startsWith("/admin")) return <AdminHeader />;
    if (location.pathname.startsWith("/manager")) return <ManagerHeader />;
    //if (location.pathname.startsWith("/instr")) return <InstrHeader />;
    //if (location.pathname.startsWith("/student")) return <StudentHeader />;

    return null; // 기본 헤더 (필요 시 추가)
  };

  const getSidebar = () => {
    if (location.pathname.startsWith("/admin")) return <AdminSideBar />;
    if (location.pathname.startsWith("/manager")) return <ManagerSideBar />;
    //if (location.pathname.startsWith("/instr")) return <InstrSideBar />;
    //if (location.pathname.startsWith("/student")) return <StudentSideBar />;
    return null; // 기본 사이드바 (필요 시 추가)
  };

  return (
    <div className="app-container">
      {getHeader()}
      <div className="content-container">
        {getSidebar()}
        <div className="main-content">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users/list" element={<UsersList />} />
            <Route path="/admin/KDT/list" element={<CourseList />} />
            <Route path="/admin/KDT/course/:id" element={<SessionList />} />
            <Route path="/admin/KDT/session/:id" element={<SessionDetail />} />
            <Route path="/admin/KDT/:id/att/list" element={<AttList />} />
            <Route path="/admin/KDT/:kdtSessionId/att/detail/:kdtPartId" element={<AttListDetail />} />
            {/* Manager Routes */}  
            <Route path="/manager/dashboard" element={<Dashboard />} />
            {/* Instructor Routes */}

            {/* Student Routes */}
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