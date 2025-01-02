import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/admin/UsersList";
import CourseList from "./pages/admin/CourseList";
import SessionList from "./pages/admin/SessionList";

function App() {
  
  return (
  <Router basename="/view">
    <div className="app-container">
        {/* 고정 헤더 */}
        <AdminHeader />
        <div className="content-container">
        {/* 고정 사이드바 */}
        <AdminSideBar />
        {/* 동적인 메인 콘텐츠 */}
        <div className="main-content">
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users/list" element={<UsersList />} />
          <Route path="/admin/KDT/list" element={<CourseList />} />
          <Route path="/admin/KDT/course/:id" element={<SessionList />} />
        </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
