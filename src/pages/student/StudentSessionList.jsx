import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "/src/css/student/StudentAtt.module.css";

const StudentAtt = () => {
  const { kdtSessionId } = useParams(); // URL에서 courseId 가져오기
  const navigate = useNavigate(); // 히스토리 백을 위한 useNavigate
  const [attendanceData, setAttendanceData] = useState(null); // 출석 데이터 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리

 

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8091/api/student/KDT/${kdtSessionId}/att/detail`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
        });
        const data = response.data; // 응답 데이터 추출
        console.log("서버 응답 데이터:", data); // 데이터 로그 출력
        
        if (response.status === 403 && data.message === "회차에 등록된 학생이 아닙니다.") {
          // 403 에러 발생 시 알림 표시 후 리다이렉트
          alert(data.message); // 메시지 표시
          navigate(-1); // 리다이렉트
          return;
        }

        // 데이터가 정상일 경우 상태 업데이트
        setAttendanceData(data);
      } catch (error) {
        console.error("데이터 요청 중 오류 발생:", error);

        // 오류 메시지를 설정
        if (error.response) {
          setErrorMessage(error.response.data.message || "데이터 요청 중 문제가 발생했습니다.");
        } else {
          setErrorMessage("서버와의 연결에 문제가 발생했습니다.");
        }
      }
    };

    fetchAttendanceData();
  }, [kdtSessionId, navigate]);



  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")} ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className={styles.container}>
    {errorMessage && <div className={styles.error}>{errorMessage}</div>}

    {attendanceData ? (
      <>
        {/* 회차 정보 표시 */}
        <div className={styles.sessionInfo}>
          <h2 className={styles.title}>{attendanceData.KDTSessionDTO.kdtSessionTitle}</h2>
          <p className={styles.description}>{attendanceData.KDTSessionDTO.kdtSessionDescript}</p>
          <p className={styles.period}>
            <strong>기간:</strong> {attendanceData.KDTSessionDTO.kdtSessionStartDate} ~ {attendanceData.KDTSessionDTO.kdtSessionEndDate}
          </p>
          <p className={styles.location}>
            <strong>위치:</strong> {attendanceData.KDTSessionDTO.kdtSessionAddress} {attendanceData.KDTSessionDTO.kdtSessionAddressDetail}
          </p>
        </div>

        {/* 출석부 테이블 표시 */}
        <div className={styles.tableContainer}>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>날짜</th>
                <th className={styles.tableHeader}>출입 시간</th>
                <th className={styles.tableHeader}>퇴실 시간</th>
                <th className={styles.tableHeader}>출석 상태</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.kdtAttDTOs.map((att, index) => (
                <tr key={att.kdtAttId} className={styles.tableRow}>
                  <td className={styles.tableCell}>{formatDate(att.kdtAttDate)}</td>
                  <td className={styles.tableCell}>{formatDate(att.kdtAttEntryTime)}</td>
                  <td className={styles.tableCell}>{formatDate(att.kdtAttExitTime)}</td>
                  <td className={styles.tableCell}>{att.kdtAttStatus || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      <p className={styles.noData}>출석 데이터가 없습니다.</p>
    )}
  </div>
  );
};

export default StudentAtt;
