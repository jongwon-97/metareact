import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomCalendar from "/src/components/CustomCalendar";
import styles from "/src/css/admin/AttListDetail.module.css";

const AttListDetail = () => {
  const { kdtSessionId, kdtPartId } = useParams(); // URL 파라미터
  const [detailInfo, setDetailInfo] = useState(null); // 상세 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
  const [events, setEvents] = useState([]); // 캘린더 이벤트 데이터
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜
  const [editable, setEditable] = useState(false); // 수정 가능 여부

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

  const toggleEditable = () => {
    setEditable(!editable);
  };

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (errorMessage) return <div className={styles.error}>{errorMessage}</div>;

  return (
    <div className={styles.attDetailContainer}>
      <h1 className={styles.header}>출석부 상세 정보</h1>
      {detailInfo && (
        <>
          <div className={styles.sessionInfo}>
            <h3>학생 이름: {detailInfo.kdtAttListDTO[0]?.kdtPartName || "정보 없음"}</h3>
            <p>회차 제목: {detailInfo.KDTSessionDTO?.kdtSessionTitle || "정보 없음"}</p>
            <p>총 출석률: {detailInfo.kdtAttListDTO[0]?.kdtAttRate || "정보 없음"}%</p>
          </div>
          {/* FullCalendar로 변경된 달력 */}
          <div className={styles.calendarContainer}>
            <h2 className={styles.subHeader}>출석 기록</h2>
            <CustomCalendar
        events={events}
        onEventClick={(info) => setSelectedDate(new Date(info.event.start))}
        onDateClick={(info) => setSelectedDate(new Date(info.dateStr))}
      />
          </div>
          {/* 테이블 */}
          <div className={styles.tableContainer}>
            <h3 className={styles.subHeader}>선택된 날짜: {selectedDate.toLocaleDateString()}</h3>
            <table className={styles.attendanceTable}>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>상태</th>
                  <th>입실 시간</th>
                  <th>퇴실 시간</th>
                </tr>
              </thead>
              <tbody>
                {detailInfo.kdtAttDTOs
                  .filter(
                    (record) => record.kdtAttDate === selectedDate.toISOString().split("T")[0]
                  )
                  .map((record, index) => (
                    <tr key={index}>
                      <td>{record.kdtAttDate || "정보 없음"}</td>
                      <td>
                        {editable ? (
                          <select
                            value={record.kdtAttStatus || ""}
                            onChange={(e) =>
                              (detailInfo.kdtAttDTOs[index].kdtAttStatus = e.target.value)
                            }
                          >
                            <option value="ARRIVAL">입실</option>
                            <option value="DEPARTURE">출석</option>
                            <option value="OUTGOING">외출</option>
                            <option value="EARLY_LEAVE">조퇴</option>
                            <option value="VACATION">휴가</option>
                            <option value="ABSENT">결석</option>
                            <option value="SICK_LEAVE">병결</option>
                            <option value="ERROR">오류</option>
                          </select>
                        ) : (
                          record.kdtAttStatus || "상태 없음"
                        )}
                      </td>
                      <td>{record.kdtAttEntryTime || "-"}</td>
                      <td>{record.kdtAttExitTime || "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className={styles.editButton} onClick={toggleEditable}>
              {editable ? "저장" : "수정"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AttListDetail;
