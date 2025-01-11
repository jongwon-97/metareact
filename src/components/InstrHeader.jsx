import React from "react";
import styles from "../css/instr/InstrHeader.module.css";
import apiClient from "../js/api/axios";

const InstrHeader = () => {
  
    const userName = "ko1597@naver.com"; // 로그인된 사용자 이름 (임시 데이터)
    
    const handleLogout = async () => {
      try {
        const response = await apiClient.post("/logout"); // CSRF 토큰 자동 포함
        console.log("로그아웃 성공:", response.data);
        alert("로그아웃되었습니다.");
        window.location.href = "/login";
      } catch (error) {
        console.error("로그아웃 요청 중 에러 발생:", error);
        alert("로그아웃 요청 중 문제가 발생했습니다.");
      }
    };
    return (
    <nav className={`${styles.navbar} navbar`}>
      <div className={styles.leftSection}>
      <a className={`${styles.brand}`} href="/view/instr/dashboard">
        메타러닝 강사 페이지
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

export default InstrHeader;
