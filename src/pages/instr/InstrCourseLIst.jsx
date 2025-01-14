import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "/src/css/instr/InstrCourseList.module.css";

const InstrCourseList = () => {
  const [courses, setCourses] = useState([]); // 과정 데이터 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 관리
 

  // 페이지 로드 시 데이터 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/instr/KDT/list", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 포함
        });
        setCourses(response.data); // 과정 데이터 설정
      } catch (error) {
        setErrorMessage("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className={styles.courselistcontainer}>
    <h2 className={styles.listheader}>국비 과정 목록</h2>
    {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

    <table className={styles.courselisttable}>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">과정명</th>
          <th scope="col">상태</th>
          <th scope="col">종류</th>
          <th scope="col">상세보기</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course , index) => (
          <tr key={course.kdtCourseId}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/instr/KDT/course/${course.kdtCourseId}`}>
                {course.kdtCourseTitle || "제목 없음"}
              </Link>
            </td>
            <td>{course.kdtCourseStatus ? "활성" : "비활성"}</td>
            <td>{course.kdtCourseType || "정보 없음"}</td>
            <td>
              <Link to={`/instr/KDT/course/${course.kdtCourseId}`}
                className={`${styles.btn} ${styles.btnWarning}`}
              >
                상세보기
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default InstrCourseList;