import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SessionDetail = () => {
  const [sessionDetail, setSessionDetail] = useState(null); // 회차 상세 정보
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 더미 데이터
    const dummyData = {
      kdtSessionId: 1,
      kdtCourseId: 1001,
      kdtSessionNum: 2,
      kdtSessionTitle: "Spring Boot Advanced",
      kdtSessionDescript: "Spring Boot 심화 과정을 학습합니다.",
      kdtSessionStartDate: "2025-01-01",
      kdtSessionEndDate: "2025-02-28",
      kdtSessionCategory: "Backend",
      kdtSessionMaxCapacity: 30,
      kdtSessionThumbnail: "/images/session1-thumbnail.jpg",
      kdtSessionStartTime: "09:00",
      kdtSessionEndTime: "17:00",
      kdtSessionPostcode: "12345",
      kdtSessionAddress: "서울특별시 강남구 테헤란로",
      kdtSessionAddressDetail: "15층",
      kdtSessionOnline: false,
      kdtSessionTotalDay: 30,
      kdtSessionOnedayTime: 8,
      kdtSessionTotalTime: 240,
    };

    // 더미 데이터로 상태 업데이트
    setTimeout(() => {
      setSessionDetail(dummyData); // 더미 데이터 설정
      setLoading(false); // 로딩 완료
    }, 1000); // 테스트용 딜레이
  }, []);

  if (loading) return <div className="text-center">로딩 중...</div>; // 로딩 상태 표시

  return (
    <div className="container mt-4">
      <h1>회차 상세 정보</h1>
      {sessionDetail ? (
        <div className="card">
          <div className="card-header">
            <h2>{sessionDetail.kdtSessionTitle || "제목 없음"}</h2>
          </div>
          <div className="card-body">
            <p><strong>과정 번호:</strong> {sessionDetail.kdtCourseId}</p>
            <p><strong>회차 번호:</strong> {sessionDetail.kdtSessionNum}</p>
            <p><strong>설명:</strong> {sessionDetail.kdtSessionDescript || "설명 없음"}</p>
            <p><strong>카테고리:</strong> {sessionDetail.kdtSessionCategory || "정보 없음"}</p>
            <p><strong>시작일:</strong> {sessionDetail.kdtSessionStartDate || "정보 없음"}</p>
            <p><strong>종료일:</strong> {sessionDetail.kdtSessionEndDate || "정보 없음"}</p>
            <p><strong>시작 시간:</strong> {sessionDetail.kdtSessionStartTime || "정보 없음"}</p>
            <p><strong>종료 시간:</strong> {sessionDetail.kdtSessionEndTime || "정보 없음"}</p>
            <p><strong>총 교육 일수:</strong> {sessionDetail.kdtSessionTotalDay || 0}일</p>
            <p><strong>하루 교육 시간:</strong> {sessionDetail.kdtSessionOnedayTime || 0}시간</p>
            <p><strong>총 교육 시간:</strong> {sessionDetail.kdtSessionTotalTime || 0}시간</p>
            <p><strong>최대 수강 인원:</strong> {sessionDetail.kdtSessionMaxCapacity || "정보 없음"}</p>
            <p><strong>주소:</strong> {sessionDetail.kdtSessionPostcode} {sessionDetail.kdtSessionAddress} {sessionDetail.kdtSessionAddressDetail}</p>
            <p><strong>온라인 여부:</strong> {sessionDetail.kdtSessionOnline ? "온라인" : "오프라인"}</p>
            {sessionDetail.kdtSessionThumbnail && (
              <div>
                <strong>썸네일:</strong>
                <img
                  src={sessionDetail.kdtSessionThumbnail}
                  alt="Session Thumbnail"
                  className="img-fluid mt-2"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>회차 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default SessionDetail;
