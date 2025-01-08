import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import styles from "/src/css/admin/AttLog.module.css";
import Papa from "papaparse";

const AttLog = () => {
    const { kdtSessionId, kdtPartId } = useParams(); // URL 파라미터
    const [logInfo, setLogInfo] = useState([]); // 상세 데이터
    const [filteredLogInfo, setFilteredLogInfo] = useState([]); // 필터링된 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
    const [studentInfo, setStudentInfo] = useState(null); // 학생 정보 저장
    const today = dayjs(); // 현재 날짜
    const [selectedYear, setSelectedYear] = useState(today.year().toString()); // 현재 연도
    const [selectedMonth, setSelectedMonth] = useState((today.month() + 1).toString()); // 현재 월 (month()는 0부터 시작)
    const printRef = useRef();

    const handlePrint = () => {
        if (printRef.current) {
          window.print(); // 브라우저 기본 출력
        }
      };

    // 날짜 포맷팅 함수 (시간만 추출)
    const formatTime = (dateTime) => {
    return dateTime ? dayjs(dateTime).format("HH:mm") : "N/A"; // 시간만 추출
    };

    useEffect(() => {
      const fetchLog = async () => {
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
          // 학생 정보 설정
          if (response.data.kdtAttListDTO && response.data.kdtAttListDTO.length > 0) {
          setStudentInfo(response.data.kdtAttListDTO[0]); // 첫 번째 학생 데이터 가져오기
          }
          setLogInfo(Array.isArray(response.data.kdtAttDTOs) ? response.data.kdtAttDTOs : []); // 배열 확인 후 설정
  
        } catch (error) {
          setErrorMessage("상세 데이터를 불러오는 데 실패했습니다.");
          console.error("상세 데이터를 불러오는 중 오류 발생:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLog();
    }, [kdtSessionId, kdtPartId]);

     // 연도 및 월별 데이터 필터링
    useEffect(() => {
        if (!selectedYear && !selectedMonth) {
        setFilteredLogInfo(logInfo); // 선택값이 없으면 전체 데이터 표시
        } else {
        const filtered = logInfo.filter((log) => {
            const date = dayjs(log.kdtAttDate);
            const yearMatch = selectedYear ? date.year() === parseInt(selectedYear) : true;
            const monthMatch = selectedMonth ? date.month() + 1 === parseInt(selectedMonth) : true; // month()는 0부터 시작하므로 +1
            return yearMatch && monthMatch;
        });
        setFilteredLogInfo(filtered);
        }
    }, [logInfo, selectedYear, selectedMonth]);

    const exportToCSV = () => {
        // 필요한 필드만 선택하여 데이터 변환
    const filteredData = filteredLogInfo.map((log) => ({
        날짜: log.kdtAttDate || "N/A",
        입실시간: formatTime(log.kdtAttEntryTime),
        퇴실시간: formatTime(log.kdtAttExitTime),
        출석상태: log.kdtAttStatus || "N/A",
        }));

    // CSV 변환
    const csv = Papa.unparse(filteredData); // 선택된 데이터만 포함
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // 파일 다운로드
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "출석부.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    };

    const years = Array.from({ length: 6 }, (_, i) => today.year() - 5 + i);

  
    if (loading) return <div className={styles.loading}>로딩 중...</div>;
    if (errorMessage) return <div className={styles.error}>{errorMessage}</div>;
  
    return (
        <div className={styles.attLogContainer}>
        <div ref={printRef}>
          <h2> {studentInfo?.kdtPartName || "학생 이름 없음"}{" "}
          
          </h2>

          <h6>
            (출석: {studentInfo?.attCount || 0}, 지각: {studentInfo?.tardyCount || 0}, 결석:{studentInfo?.absenceCount || 0}
            ,조퇴:{studentInfo?.earlyLeaveCount || 0}, 외출: {studentInfo?.outgoingCount || 0})
          </h6>

          {/* 연도 및 월 선택 */}
        <div className={styles.filterContainer}>
        <label>
            연도:
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">전체</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label>
            월:
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">전체</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}월
                </option>
              ))}
            </select>
          </label>
        </div>

          <table className={styles.attLogTable}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>입실 시간</th>
                <th>퇴실 시간</th>
                <th>출석 상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogInfo.map((log, index) => (
                <tr key={index}>
                  <td>{log.kdtAttDate}</td>
                  <td>{formatTime(log.kdtAttEntryTime)}</td>
                  <td>{formatTime(log.kdtAttExitTime)}</td>
                  <td>{log.kdtAttStatus || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button className={styles.exportButton} onClick={exportToCSV}>
          CSV 파일로 저장
        </button>
  
        <button
          className={styles.printButton}
          onClick={handlePrint}
          disabled={logInfo.length === 0} // 데이터 없으면 비활성화
        >
          출력
        </button>

      </div>
    );
  };
  
  
  export default AttLog;
  