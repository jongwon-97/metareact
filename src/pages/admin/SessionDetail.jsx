import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "/src/css/admin/SessionDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const SessionDetail = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState([]); // 회차 상세 정보
  const [participantCount, setParticipantCount] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지

  useEffect(() => {
    // 더미 데이터
    const fetchSessionDetail = async()=>{
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8091/api/admin/KDT/session/${sessionId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
        });

        setSessionDetail(response.data); // 과정 데이터 설정
        // 두 번째 요청
        const countDataResponse = await axios.get(`http://localhost:8091/api/admin/part/${sessionId}/count`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        });
        console.log("추가 데이터:", countDataResponse.data);
         // 두 번째 데이터를 상태에 저장
        setParticipantCount(countDataResponse.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("데이터를 불러오는 데 실패했습니다.");
      }finally {
        setLoading(false);
      }
    };

    fetchSessionDetail();
  }, [sessionId]);

  if (loading) return <div className="text-center">로딩 중...</div>; // 로딩 상태 표시
  if (errorMessage) return <div className="text-danger text-center">{errorMessage}</div>;

  return (
    <div className={styles.sessioncontainer}>
      
      <div>
        {/* 네비게이션 바 */}
        <nav className={`${styles.sessionNavbar}`}>
          <Link
          className={`${styles.attsessionNavLink}`}
          to={`/admin/KDT/${sessionDetail.kdtSessionId}/part/list`}
          >
          참가자명단
          </Link>
          
          <a className={`${styles.partsessionNavLink}`} 
          href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/staff/list`}>
            담당자 명단
          </a>

          <Link
          className={`${styles.attsessionNavLink}`}
          to={`/admin/KDT/${sessionDetail.kdtSessionId}/att/list`}
           >
          출석부
          </Link>

          <div className={styles.testsessionNavLink}>

          <Link
          className={`${styles.attsessionNavLink}`}
          to={`/admin/KDT/${sessionDetail.kdtSessionId}/test/list`}
           >
          시험
          </Link>
        
          </div>

          <div className={styles.counselsessionNavLink}>
            <a>훈련일지</a>
              {/* 하위 메뉴 */}
              <div 
              className={styles.counseldropdownMenu}>
                <Link to={`/admin/KDT/${sessionDetail.kdtSessionId}/train/list`}>훈련일지 목록</Link>
                <a href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/train`}>훈련일지 작성</a>
              </div>
          </div>

          <div className={styles.counselsessionNavLink}>
            <a>상담일지</a>
              {/* 하위 메뉴 */}
              <div 
              className={styles.counseldropdownMenu}>
                <a href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/appconsult/list`}>신청상담 목록</a>
                <a href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/consult/list`}>수강생상담 목록</a>
              </div>
          </div>

          <div className={styles.boardsessionNavLink}>
          <a>게시판</a>
            {/* 하위 메뉴 */}
            <div className={styles.boarddropdownMenu}>
              <a href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/board/materiallist`}>강의 자료실</a>
              <a href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/courseoutline/list`}>강의 영상</a>
              <a href={`http://localhost:8091/admin/KDT/${sessionDetail.kdtSessionId}/detail/detail`}>홍보게시글</a>
            </div>
          </div>  
        </nav>
      </div>
      <div className={styles.sessionContent}>
  {sessionDetail ? (
    <div className={`card ${styles.card}`}>
      <div className={`card-header ${styles.cardHeader}`}>
        <h2>{sessionDetail.kdtSessionTitle || "제목 없음"}</h2>
      </div>
      <div className={`card-body ${styles.cardBody}`}>
        {/* 기본 정보 섹션 */}
        <h3>정보</h3>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>회차 번호</th>
              <td>{sessionDetail.kdtSessionNum}회차</td>
              <th>상태</th>
              <td>{sessionDetail.kdtSessionStatus}</td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>{sessionDetail.kdtSessionCategory || "정보 없음"}</td>
              <th>상태</th>
              <td>{sessionDetail.kdtSessionStatus}</td>
            </tr>
            <tr>
              <th>담당매니저</th>
              <td>{sessionDetail.kdtSessionDescript || "매니저 없음"}</td>
              <th>담당 강사</th>
              <td>{sessionDetail.kdtSessionDescript || "강사 없음"}</td>
            </tr>
          </tbody>
        </table>

        {/* 시간 정보 섹션 */}
        <h3>시간 </h3>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>시작일</th>
              <td>{sessionDetail.kdtSessionStartDate || "정보 없음"}</td>
              <th>종료일</th>
              <td>{sessionDetail.kdtSessionEndDate || "정보 없음"}</td>
              
            </tr>
            <tr>
            <th>시작 시간</th>
            <td>{sessionDetail.kdtSessionStartTime || "정보 없음"}</td>
              <th>종료 시간</th>
              <td>{sessionDetail.kdtSessionEndTime || "정보 없음"}</td>
            </tr>
        
            <tr>
              <th>총 교육 일수</th>
              <td>{sessionDetail.kdtSessionTotalDay || 0}일</td>
              <th>총 교육 시간</th>
              <td>{sessionDetail.kdtSessionTotalTime || 0}시간</td>
            </tr>
            <tr>
              <th>하루 교육 시간</th>
              <td>{sessionDetail.kdtSessionOnedayTime || 0}시간</td>
              <th>최대 수강 인원</th>
              <td>{sessionDetail.studentCount || "정보 없음"}/{sessionDetail.kdtSessionMaxCapacity || "정보 없음"}</td>
            </tr>
          </tbody>
        </table>

        {/* 장소 정보 섹션 */}
        <h3>장소</h3>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>우편번호</th>
              <td>{sessionDetail.kdtSessionPostcode}</td>
              <th>주소</th>
              <td>{sessionDetail.kdtSessionAddress}</td>
            </tr>
            <tr>
              <th>상세주소</th>
              <td colSpan="3">{sessionDetail.kdtSessionAddressDetail}</td>
            </tr>
            <tr>
              <th >온라인 여부</th>
              <td colSpan="3">{sessionDetail.kdtSessionOnline ? "온라인" : "오프라인"}</td>
            </tr>
            <tr>
              
            </tr>
          </tbody>
        </table>

        {/* 썸네일 이미지 */}
        {sessionDetail.kdtSessionThumbnail && (
          <div className={styles.thumbnailContainer}>
            <h3>썸네일</h3>
            <img
              src={sessionDetail.kdtSessionThumbnail}
              alt="Session Thumbnail"
              className={`img-fluid mt-2 ${styles.thumbnail}`}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>회차 정보를 찾을 수 없습니다.</div>
  )}
</div>
</div>
  );
};

export default SessionDetail;
