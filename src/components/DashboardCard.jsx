import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardCards() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 정의

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8091/api/admin/user/role/list",{
        headers: {
          "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
          });
        console.log(response.data);
        setData(response.data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setErrorMessage("데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="text-center">
        {errorMessage || "로딩 중..."}
      </div>
    );
  }

  const cards = [
    {
      title: "총 회원수",
      value: data.adminTotal + data.managerTotal + data.instructorTotal + data.studentTotal,
      color: "bg-primary",
    },
    { title: "관리자 수", value: data.adminTotal, color: "bg-warning" },
    { title: "매니저 수", value: data.managerTotal, color: "bg-success" },
    { title: "강사 수", value: data.instructorTotal, color: "bg-danger" },
    { title: "학생 수", value: data.studentTotal, color: "bg-info" },
  ];

  return (
     <div className="row">
      {cards.map((card, index) => (
        <div className="col-xl-3 col-md-6" key={index}>
          <div className={`card ${card.color} text-white mb-4`}>
            <div className="card-body">
              <h5>{card.title}</h5>
              <p>{card.value}명</p>
            </div>
            <div className="card-footer d-flex align-items-center justify-content-between">
              <a className="text-white" href="#">
                자세히 보기
              </a>
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
