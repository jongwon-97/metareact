import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart, Filler } from "chart.js";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../css/Dashboard.module.css";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";

// Chart.js 플러그인 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
Chart.register(Filler);

function Dashboard() {
  const [userCount, setUserCount] = useState(null); // 회원 수 상태
  const [userGrowth, setUserGrowth] = useState([]); // 회원 증감율 데이터
  const [upload, setUpload] = useState([]); // 강의 등록 수 데이터
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userCountResponse, userGrowthResponse, uploadResponse] = await Promise.all([
          axios.get("/api/admin/user/role/list", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
          axios.get("/api/admin/user/count", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
          axios.get("/api/admin/course/monthlycount", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
        ]);

        setUserCount(userCountResponse.data);
        setUserGrowth(removeDuplicates(userGrowthResponse.data));
        setUpload(removeDuplicates(uploadResponse.data.data));
      } catch (error) {
        console.error(error);
        setErrorMessage("데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  // 중복 제거 함수
  const removeDuplicates = (data) => {
    const uniqueData = [];
    const keys = new Set();

    data.forEach((item) => {
      const key = JSON.stringify(item);
      if (!keys.has(key)) {
        keys.add(key);
        uniqueData.push(item);
      }
    });

    return uniqueData;
  };

  // 데이터가 없으면 로딩 또는 에러 메시지 표시
  if (!userCount || userGrowth.length === 0 || upload.length === 0) {
    return <p className={styles.errorMessage}>{errorMessage || "로딩 중..."}</p>;
  }

  // 회원 증감율 차트 데이터
  const userGrowthChartData = {
    labels: userGrowth.map((growth) => `${growth.month}월`),
    datasets: [
      {
        label: "회원 증감율",
        data: userGrowth.map((growth) => growth.userCount),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // 강의 등록 수 차트 데이터
  const uploadChartData = {
    labels: upload.map((stat) => `${stat.month}월`),
    datasets: [
      {
        label: "강의 등록 수",
        data: upload.map((stat) => stat.courseCount),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 차트 옵션: 회원 증감율
  const userGrowthChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "월별 회원 증감율" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // 적절한 간격 설정
          callback: (value) => `${Math.round(value)}명`,
        },
      },
    },
  };

  // 차트 옵션: 강의 등록 수
  const uploadChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "월별 강의 등록 수" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // 적절한 간격 설정
          callback: (value) => `${Math.round(value)}개`,
        },
      },
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className="row">
        <div className="col-md-6">
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>현재 회원수</h3>
            <p><strong>관리자:</strong> {userCount.adminTotal}명</p>
            <p><strong>매니저:</strong> {userCount.managerTotal}명</p>
            <p><strong>강사:</strong> {userCount.instructorTotal}명</p>
            <p><strong>학생:</strong> {userCount.studentTotal}명</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className={styles.emptySpace}>
            <h3 className={styles.emptySpaceText}>추가 콘텐츠 공간</h3>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>회원 증감율</h3>
            <Line data={userGrowthChartData} options={userGrowthChartOptions} />
          </div>
        </div>

        <div className="col-md-6">
          <div className={styles.chartContainer}>
            <h3 className={styles.chartTitle}>온라인 강의 등록 수</h3>
            <Bar data={uploadChartData} options={uploadChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
