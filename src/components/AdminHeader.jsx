import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/admin/AdminHeader.module.css";

const AdminHeader = () => {
  const [userName] = useState("코사장"); // 사용자 이름 상태
  const LOGOUT_URL = "http://localhost:8091/logout"; // 로그아웃 API
  const REDIRECT_URL = "http://localhost:8091/"; // 로그아웃 후 리디렉션 URL


  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await axios.post(
        LOGOUT_URL, // 요청 바디 (필요 없으므로 빈 객체 전달)
        { withCredentials: true } // 인증 쿠키 포함
      );

      alert("로그아웃 완료");
      window.location.href = REDIRECT_URL; // 로그아웃 후 홈으로 리디렉트
    } catch (error) {
      console.error("로그아웃 요청 중 에러 발생:", error);
      alert("로그아웃 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };



  return (
    <nav className={`${styles.navbar} navbar navbar-dark bg-dark`}>
      <div className={styles.leftSection}>
        <a className={`${styles.brand}`} href="/view/admin/dashboard">
          메타러닝 관리자 대시보드
        </a>
      </div>

      <div className={styles.rightSection}>
        <span className={styles.userName}>{userName}</span>
        <button className={`${styles.logoutButton}`} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
};

export default AdminHeader;
