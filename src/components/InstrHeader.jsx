import React, {useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/instr/InstrHeader.module.css";

const InstrHeader = () => {
  
    const [userInfo, setUserInfo] = useState({ email: "", role: "" }); // 사용자 이름 상태
    const LOGOUT_URL = "/logout"; // 로그아웃 API
    const REDIRECT_URL = "/"; // 로그아웃 후 리디렉션 URL
    const roleMap = {
      INSTR: "강사",
    };
    
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get("/api/instr/user/profile", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
    
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
          setErrorMessage("사용자 정보를 불러오는 중 오류가 발생했습니다.");
        }
      };
      
    
      fetchUserInfo();
    }, []);

       // 로그아웃 핸들러
   const handleLogout = async () => {
    try {
      // 서버 로그아웃 요청
      const response = await axios.post(LOGOUT_URL, {}, { withCredentials: true });

      if (response.status === 200) {
        // 로그아웃 성공 메시지
        alert("로그아웃이 완료되었습니다.");

        // 사용자 정보 초기화
        setUserInfo({ name: "", email: "", role: "" });

        // 로그인 화면으로 리디렉션
        window.location.href = REDIRECT_URL;
      } else {
        alert("로그아웃 요청이 실패했습니다.");
      }
    } catch (error) {
      // 오류 처리
      console.error("로그아웃 에러:", error);
      alert("로그아웃 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };
  

    return (
    <nav className={`${styles.navbar} navbar`}>
      <div className={styles.leftSection}>
      <a className={`${styles.brand}`} href="/instr/main/mypage">
        메타러닝 강사 페이지
      </a>
    
      </div>
      
      <div className={styles.rightSection}>
    
        <span className={styles.userName}>환영합니다! {userInfo.name} ({userInfo.role})  <i className="bi bi-person-fill"></i> 로그인중</span>
        <button className={`${styles.logoutButton}`} onClick={handleLogout}>
        <i className="bi bi-box-arrow-right"style={{ marginRight: "7px" }}></i>로그아웃
        </button>
      </div>
    </nav>
  );
};

export default InstrHeader;
