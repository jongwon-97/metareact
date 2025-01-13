import React, {useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/manager/ManagerHeader.module.css";

const ManagerHeader = () => {
  
    const [userInfo, setUserInfo] = useState({ email: "", role: "" }); // 사용자 이름 상태
    const LOGOUT_URL = "/logout"; // 로그아웃 API
    const REDIRECT_URL = "/"; // 로그아웃 후 리디렉션 URL
    const roleMap = {
      MANAGER: "매니저",
    };
    
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("http://localhost:8091/api/manager/user/profile", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          console.log(response.data);
    
          if (response.status === 200) {
            setUserInfo({
              name: response.data.name || "알 수 없음",
              email: response.data.userEmail || "이메일 없음",
              role: roleMap[response.data.userRole] || "권한 없음",
            });
          } else {
            setErrorMessage("사용자 정보를 불러오지 못했습니다.");
          }
        } catch (error) {
          console.error("사용자 정보 요청 중 에러 발생:", error);
          setErrorMessage("사용자 정보를 불러오는 중 오류가 발생했습니다.");
        }
      };
    
      fetchUserInfo();
    }, []);

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
    <nav className={`${styles.navbar} navbar`}>
      <div className={styles.leftSection}>
      <a className={`${styles.brand}`} href="/view/manager/dashboard">
        메타러닝 매니저 대시보드
      </a>
    
      </div>
      
      <div className={styles.rightSection}>
    
        <span className={styles.userName}>{userInfo.email} {userInfo.role}</span>
        <button className={`${styles.logoutButton}`} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </nav>
  );
};

export default ManagerHeader;
