import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/admin/AdminHeader.module.css";

const AdminHeader = () => {
  const [userName] = useState("알 수 없음"); // 사용자 이름 상태
  const LOGOUT_URL = "http://localhost:8091/logout"; // 로그아웃 API
  //const USER_INFO_URL = "http://localhost:8091/api/admin"; // 사용자 정보 API
  //const REDIRECT_URL = "/"; // 로그아웃 후 리디렉션 URL

  // CSRF 토큰 가져오기 (쿠키에서 추출)
  const getCsrfToken = () => {
    try {
      const cookies = document.cookie.split("; ");
      const csrfCookie = cookies.find((cookie) => cookie.startsWith("XSRF-TOKEN="));
      return csrfCookie ? csrfCookie.split("=")[1] : null;
    } catch (error) {
      console.error("CSRF 토큰을 가져오는 중 에러 발생:", error);
      return null;
    }
  };

  // // 사용자 정보를 가져오는 함수
  // const fetchUserName = async () => {
  //   try {
  //     const response = await axios.get(USER_INFO_URL, {
  //       withCredentials: true, // 인증 쿠키 포함
  //     });

  //     if (response.status === 200) {
  //       const { username } = response.data;
  //       setUserName(username); // 사용자 이름 설정
  //     } else {
  //       console.error("사용자 정보를 가져올 수 없습니다.");
  //       alert("사용자 정보를 가져올 수 없습니다.");
  //     }
  //   } catch (error) {
  //     console.error("사용자 정보 요청 중 에러 발생:", error);
  //     alert("사용자 정보 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      const csrfToken = getCsrfToken(); // CSRF 토큰 가져오기
      if (!csrfToken) {
        alert("CSRF 토큰을 가져올 수 없습니다. 다시 시도해주세요.");
        return;
      }

      await axios.post(
        LOGOUT_URL,
        {}, // 요청 바디 (필요 없으므로 빈 객체 전달)
        {
          withCredentials: true, // 인증 쿠키 포함
          headers: { "X-XSRF-TOKEN": csrfToken }, // CSRF 토큰 추가
        }
      );

      alert("로그아웃 완료");
      window.location.href = REDIRECT_URL; // 로그아웃 후 홈으로 리디렉트
    } catch (error) {
      console.error("로그아웃 요청 중 에러 발생:", error);
      alert("로그아웃 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    userName; // 컴포넌트 마운트 시 사용자 정보 가져오기
  }, []);

  return (
    <nav className={`${styles.navbar} navbar navbar-dark bg-dark`}>
      <div className={styles.leftSection}>
        <a className={`${styles.brand}`} href="/admin/dashboard">
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
