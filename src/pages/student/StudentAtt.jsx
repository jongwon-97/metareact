import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomCalendar from "/src/components/CustomCalendar";
import styles from "/src/css/student/StudentAtt.module.css";
import BackButton from "/src/components/BackButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const getKST = () => dayjs().tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
const getKSTday = () =>dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");
console.log(getKSTday());
const AttListDetail = () => {
  const { kdtSessionId } = useParams(); // URL 파라미터
  const [detailInfo, setDetailInfo] = useState(null); // 상세 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
  const [events, setEvents] = useState([]); // 캘린더 이벤트 데이터
  const [currentDate] = useState(getKSTday()); // 현재 날짜 (YYYY-MM-DD 형식)
 
  const statusColorMap = {
    입실: "green",
    결석: "red",
    조퇴: "orange",
    오류: "red",
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8091/api/student/KDT/${kdtSessionId}/att/detail`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("서버 응답 데이터:", response.data);
        setDetailInfo(response.data);

        // 이벤트 데이터 가공
        const eventData = (response.data.kdtAttDTOs || []).map((record) => ({
          title: record.kdtAttStatus || "상태 없음",
          start: record.kdtAttDate,
          allDay: true,
          backgroundColor: statusColorMap[record.kdtAttStatus] || "blue",
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
  }, [kdtSessionId]);

  // 입실 처리 함수
  const handleArrival = async () => {
    try {
      
      const payload = {
        kdtAttDate: getKSTday(),
        kdtAttEntryTime: getKST(), // 현재 시간을 ISO 형식으로 추가
        kdtPartId: detailInfo.kdtAttListDTO?.[0]?.kdtPartId, // kdtPartId를 포함
      };

      const response = await axios.post(
        `http://localhost:8091/api/student/KDT/${kdtSessionId}/att/new`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(getKST());
      alert("입실 처리가 완료되었습니다.");

       // 이벤트 데이터 새로 생성
      const newEvent = {
      title: "입실",
      start: currentDate,
      allDay: true,
      backgroundColor: "green",
    };

    // 이벤트 상태 업데이트
    setEvents((prevEvents) => [...prevEvents, newEvent]);

      setDetailInfo(response.data); // 상태 갱신
    } catch (error) {
      console.error("입실 처리 중 오류 발생:", error);
      alert("입실 처리에 실패했습니다.");
    }
  };

  // 상태 업데이트 함수 (퇴실, 외출, 복귀)
  const handleUpdate = async (status) => {
    try {
      const selectedAttendance = detailInfo?.kdtAttDTOs?.find(
        (record) => record.kdtAttDate === currentDate
      );

      if (!selectedAttendance) {
        alert("출석 정보가 없습니다. 먼저 입실을 처리하세요.");
        return;
      }

      const kdtAttId = selectedAttendance.kdtAttId;

      const payload = {
        kdtPartId: detailInfo.kdtAttListDTO?.[0]?.kdtPartId, 
        kdtAttDate: currentDate,
        kdtAttStatus: status,
        ...(status === "DEPARTURE" && { kdtAttExitTime: getKST() }),
        ...(status === "OUTGOING" && { kdtAttLeaveStart: getKST() }),
        ...(status === "ARRIVAL" && { kdtAttLeaveEnd: getKST() }),
      };

      const response = await axios.put(
        `http://localhost:8091/api/student/KDT/${kdtSessionId}/att/update/${kdtAttId}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(`${status} 처리가 완료되었습니다.`);
      setDetailInfo(response.data); // 상태 갱신
    } catch (error) {
      console.error(`${status} 처리 중 오류 발생:`, error);
      alert(`${status} 처리에 실패했습니다.`);
    }
  };


  const renderAttendanceStats = () => {
    const stats = detailInfo?.kdtAttListDTO?.[0] || {};
    return (
      <p className={styles.attendanceStats}>
        <span>출석율: {stats.kdtAttRate || "정보 없음"}%</span>&nbsp;&nbsp;
        <span>출석: {stats.attCount || 0}회</span>&nbsp;&nbsp;
        <span>외출: {stats.outgoingCount || 0}회</span>&nbsp;&nbsp;
        <span>조퇴: {stats.earlyLeaveCount || 0}회</span>&nbsp;&nbsp;
        <span>병결: {stats.tardyCount || 0}회</span>
      </p>
    );
  };
  
  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (errorMessage) return <div className={styles.error}>{errorMessage}</div>;

  return (
    <div className={styles.attDetailContainer}>
      {detailInfo && (
        <>
          <div className={styles.sessionInfo}>
            <h3>학생 이름: {detailInfo.kdtAttListDTO?.[0]?.kdtPartName || "정보 없음"}</h3>
            <p>{detailInfo.KDTSessionDTO?.kdtSessionTitle || "정보 없음"}</p>
            {renderAttendanceStats()}
            
          </div>

          <div className={styles.actionButtons}>
          {/* 복귀 버튼: 외출 처리된 경우에만 표시 */}
          {detailInfo?.kdtAttDTOs?.some(
            (record) => record.kdtAttDate === currentDate && record.kdtAttStatus === "외출"
          ) ? (
            <button
              className={styles.updateButton}
              onClick={() => handleUpdate("ARRIVAL")}
            >
              복귀
            </button>
          ) : (
            <>
              {/* 입실 버튼: 출석 정보가 없거나 퇴실 처리된 경우에만 표시 */}
              {!detailInfo?.kdtAttDTOs?.some(
                (record) => record.kdtAttDate === currentDate && record.kdtAttStatus === "입실"
              ) && (
                <button
                  className={styles.updateButton}
                  onClick={() => handleArrival()}
                >
                  입실
                </button>
              )}

              {/* 퇴실 버튼: 입실 처리된 경우에만 표시 */}
              {detailInfo?.kdtAttDTOs?.some(
                (record) => record.kdtAttDate === currentDate && record.kdtAttStatus === "입실"
              ) && (
                <button
                  className={styles.updateButton}
                  onClick={() => handleUpdate("DEPARTURE")}
                >
                  퇴실
                </button>
              )}

              {/* 외출 버튼: 입실 처리된 경우에만 표시 (외출하지 않은 상태) */}
              {detailInfo?.kdtAttDTOs?.some(
                (record) => record.kdtAttDate === currentDate && record.kdtAttStatus === "입실"
              ) &&
                !detailInfo?.kdtAttDTOs?.some(
                  (record) => record.kdtAttDate === currentDate && record.kdtAttStatus === "외출"
                ) && (
                  <button
                    className={styles.updateButton}
                    onClick={() => handleUpdate("OUTGOING")}
                  >
                    외출
                  </button>
                )}
            </>
          )}
        </div>

          {/*<BackButton label="뒤로가기" />*/}

          <div className={styles.calendarContainer}>
            <CustomCalendar events={events} />
          </div>

         
        </>
      )}
    </div>
  );
};

export default AttListDetail;
