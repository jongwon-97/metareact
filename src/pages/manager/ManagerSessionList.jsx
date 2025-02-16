import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "/src/css/manager/ManagerSessionList.module.css";

const ManagerSessionList = () => {
  const { courseId } = useParams(); // URL에서 courseId 가져오기
  const navigate = useNavigate(); // 히스토리 백을 위한 useNavigate
  const [sessions, setSessions] = useState([]); // 회차 데이터 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리
  const statusMap = {WAITING: "대기", ONGOING: "진행중",FINISHED: "종료",};

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:8091/api/manager/KDT/course/${courseId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
        });
        const data = response.data; // 응답 데이터 추출
        console.log("서버 응답 데이터:", data); // 데이터 로그 출력
        console.log("응답 데이터:", response.data);
        console.log(response);
        if (response.status === 403 && data.message === "회차에 등록된 매니저가 아닙니다.") {
          // 403 에러 발생 시 알림 표시 후 리다이렉트
          alert(data.message); // 메시지 표시
          navigate(-1); // 리다이렉트
          return;
        }

        // 세션 데이터가 정상일 경우 상태 업데이트
        setSessions(data);
      } catch (error) {
        console.error("데이터 요청 중 오류 발생:", error);

        // 오류 메시지를 설정
        if (error.response) {
          // 서버가 응답을 반환했을 경우
          setErrorMessage(error.response.data.message || "데이터 요청 중 문제가 발생했습니다.");
        } else {
          // 네트워크 또는 기타 문제
          setErrorMessage("서버와의 연결에 문제가 발생했습니다.");
        }
      }
    };

    fetchSessions(); // 데이터 요청
  }, [courseId, navigate]);


  return (
    <div className={styles.sessionlistcontainer}>
      <h2 className={styles.listheader}>{sessions.length > 0 && sessions[0].kdtSessionTitle} 회차 목록</h2>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      
      {sessions.length > 0 ? (
        <table className={styles.sessionlisttable}>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col" colSpan="2">회차 제목</th> 
              <th scope="col">회차</th>
              <th scope="col">상태</th>
              <th scope="col">시작일</th>    
              <th scope="col">종료일</th>  
              <th scope="col">수강생 등록하기</th>
              <th scope="col">강사 등록하기</th>
              <th scope="col">상세보기</th>
              <th scope="col">수정</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session,index) => (
              <tr key={session.kdtSessionId}>
                <td>{index + 1}</td>

                <td colSpan="2">
                  <Link to={`/manager/KDT/session/${session.kdtSessionId}`}>
                    {session.kdtSessionTitle}
                  </Link>
                </td>

                <td>{session.kdtSessionNum}회차</td>

                <td>{statusMap[session.kdtSessionStatus]}</td>
                
                <td>{session.kdtSessionStartDate}</td>
                <td>{session.kdtSessionEndDate}</td>
                <td>
                  <a href={`http://localhost:8091/manager/KDT/${session.kdtSessionId}/part`}>수강생 등록하기</a>
                </td>
        
                <td>
                  <a href={`http://localhost:8091/manager/KDT/${session.kdtSessionId}/staff/instr`}>강사 등록하기</a>
                </td>
                <td>
                  <Link to={`/manager/KDT/session/${session.kdtSessionId}`}>
                    상세 보기
                  </Link>
                </td>
                <td>
                  <button className={styles.editbtn}>
                    <a href={`http://localhost:8091/manager/KDT/session/update/${session.kdtSessionId}`} >수정</a></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">회차 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default ManagerSessionList;
