import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminHeader from "./components/AdminHeader";
import AdminSideBar from "./components/AdminSideBar";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/admin/UsersList";

function App() {
  return (
  <Router>
    <div className="app-container">
        {/* 고정 헤더 */}
        <AdminHeader />
        <div className="content-container">
        {/* 고정 사이드바 */}
        <AdminSideBar />
        {/* 동적인 메인 콘텐츠 */}
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/view/admin/users/list" element={<UsersList />} />
        </Routes>
        </div>
      </div>
    </div>
  </Router>
  );
}

export default App;
