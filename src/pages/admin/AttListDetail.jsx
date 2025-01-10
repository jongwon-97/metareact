import React, { useEffect, useState } from "react";
import { useParams ,Link } from "react-router-dom";
import axios from "axios";
import CustomCalendar from "/src/components/CustomCalendar";
import styles from "/src/css/admin/AttListDetail.module.css";
import BackButton from "/src/components/BackButton";

const AttListDetail = () => {
  const { kdtSessionId, kdtPartId } = useParams(); // URL 파라미터
  const [detailInfo, setDetailInfo] = useState(null); // 상세 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
  const [events, setEvents] = useState([]); // 캘린더 이벤트 데이터
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8091/api/admin/KDT/${kdtSessionId}/att/detail/${kdtPartId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // 쿠키 포함
          }
        );
        console.log(response.data);
        setDetailInfo(response.data);

        // FullCalendar에 사용할 이벤트 데이터 가공
        const eventData = response.data.kdtAttDTOs.map((record) => ({
          title: record.kdtAttStatus || "상태 없음",
          start: record.kdtAttDate,
          allDay: true,
          backgroundColor: record.kdtAttStatus === "ABSENT" ? "red" : "#007bff",
          borderColor: record.kdtAttStatus === "ABSENT" ? "darkred" : "#0056b3",
        }));
        setEvents(eventData);
      } catch (error) {
        setErrorMessage("상세 데이터를 불러오는 데 실패했습니다.");
        console.error("상세 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [kdtSessionId, kdtPartId]);


  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (errorMessage) return <div className={styles.error}>{errorMessage}</div>;

  return (
    <div className={styles.attDetailContainer}>
      {detailInfo && (
        <>
          <div className={styles.sessionInfo}>
            <h3>학생 이름: {detailInfo.kdtAttListDTO[0]?.kdtPartName || "정보 없음"}</h3>
            <p>{detailInfo.KDTSessionDTO?.kdtSessionNum || "정보 없음"}회차</p>
            <p>{detailInfo.KDTSessionDTO?.kdtSessionTitle || "정보 없음"}</p>
            <p className={styles.attendanceStats}>
              <span>출석율: {detailInfo.kdtAttListDTO[0]?.kdtAttRate || "정보 없음"}%</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>출석: {detailInfo.kdtAttListDTO[0]?.attCount || 0}회</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>외출: {detailInfo.kdtAttListDTO[0]?.outgoingCount || 0}회</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>조퇴: {detailInfo.kdtAttListDTO[0]?.earlyLeaveCount || 0}회</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>병결: {detailInfo.kdtAttListDTO[0]?.tardyCount || 0}회</span>
            </p>
            
            <Link to={`/admin/KDT/${kdtSessionId}/att/log/${kdtPartId}`}>상세보기</Link>
            <BackButton label="Back" />
            
          </div>
          {/* FullCalendar로 변경된 달력 */}
          <div className={styles.calendarContainer}>
            <h2 className={styles.subHeader}>출석 기록</h2>
            <CustomCalendar events={events}/>
          </div>   
        </>
      )}
    </div>
  );
};

export default AttListDetail;
