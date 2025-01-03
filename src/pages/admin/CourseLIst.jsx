import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CourseList = () => {
  const [courses, setCourses] = useState([]); // 과정 데이터 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리

  const getCookie = (cookieName) => {
    const cookies = document.cookie.split("; ");
    const csrfCookie = cookies.find((row) => row.startsWith(cookieName + "="));
    return csrfCookie ? csrfCookie.split("=")[1] : null;
  };

  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8091/api/admin/KDT/list", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
        });

        setCourses(response.data); // 과정 데이터 설정
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchCourses();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";
    const hour12 = hours > 12 ? hours - 12 : hours;

    return `${year}-${month}-${day} ${ampm} ${hour12}:${minutes}`;
  };

  // 과정 삭제 함수
  const deleteCourse = async (courseId) => {
  const csrfToken = getCookie("XSRF-TOKEN"); // Spring Security의 기본 CSRF 쿠키 이름
  if (!csrfToken) {
    alert("CSRF 토큰이 없습니다.");
    return;
  }

  try {
    const response = await axios.delete(`http://localhost:8091/api/admin/KDT//course/delete/${courseId}`, {
      headers: {
        "X-XSRF-TOKEN": csrfToken, // CSRF 토큰 추가
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Delete response:", response.data);
  } catch (error) {
    console.error("Error deleting course:", error);
    alert("삭제 요청 실패");
  }
};

  return (
    <div className="container mt-4">
      <h1 className="text-center my-4">국비과정 목록</h1>

      {errorMessage && <div className="text-danger text-center">{errorMessage}</div>}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">과정명</th>
            <th scope="col">상태</th>
            <th scope="col">종류</th>
            <th scope="col">생성일</th>
            <th scope="col">수정일</th>
            <th scope="col">상세보기</th>
            <th scope="col">수정하기</th>
            <th scope="col">삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.kdtCourseId}>
              <td>{course.kdtCourseId}</td>
              <td>
                <Link to={`/admin/KDT/course/${course.kdtCourseId}`}>
                    {course.kdtCourseTitle || "제목 없음"}
                </Link>
              </td>
              <td>{course.kdtCourseStatus ? "활성" : "비활성"}</td>
              <td>{course.kdtCourseType || "정보 없음"}</td>
              <td>{formatDate(course.kdtCourseCreatedAt)}</td>
              <td>{formatDate(course.kdtCourseUpdatedAt)}</td>
              <td>               
                <Link to={`/admin/KDT/course/${course.kdtCourseId}`} className="btn btn-warning">
                    상세보기
                </Link>
              </td>
              <td>
                <a
                  href={`http://localhost:8091/admin/KDT/course/update/${course.kdtCourseId}`}
                  className="btn btn-warning"
                >
                  수정하기
                </a>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCourse(course.kdtCourseId)}
                >
                  삭제하기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;