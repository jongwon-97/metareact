import React from "react";
import styles from "../css/instr/InstrHeader.module.css";

const InstrHeader = () => {
  
    const userName = "ko1597@naver.com"; // 로그인된 사용자 이름 (임시 데이터)
    
    const handleLogout = () => {
      alert("로그아웃되었습니다.");
      // 실제 로그아웃 로직 추가 (예: API 호출 후 리디렉션)
    };
  
    return (
    <nav className={`${styles.navbar} navbar`}>
      <div className={styles.leftSection}>
      <a className={`${styles.brand}`} href="/view/manager/dashboard">
        메타러닝
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
