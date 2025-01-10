import React from "react";
import axios from "axios";
import styles from "../css/instr/InstrHeader.module.css";

const InstrHeader = () => {
  
    const userName = "ko1597@naver.com"; // 로그인된 사용자 이름 (임시 데이터)
    
  // CSRF 토큰 가져오기 함수
  const getCsrfToken = () => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

     // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // 로그아웃 요청 보내기
      await axios.post("http:localhost:8091/logout", {},{ withCredentials: true });
      alert("로그아웃되었습니다.");
      window.location.href = "http://localhost:8091/login"; // 로그아웃 후 리디렉션
    } catch (error) {
      console.error("로그아웃 요청 중 에러 발생:", error);
      alert("로그아웃 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
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
