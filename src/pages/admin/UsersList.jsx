import React, { useState } from "react";
import styles from "/src/css/admin/UserList.module.css";
import { useLocation } from "react-router-dom";

const initialUsers = [
    { id: 1, email: "chulsoo@example.com", name: "김철수", gender: "M", role: "INSTRUCTOR", status: "ACTIVE", createdat: "2024.12.05", updatedat: "2024.12.05" },
    { id: 2, email: "younghee@example.com", name: "이영희", gender: "F", role: "MANAGER", status: "BANNED", createdat: "2024.12.05", updatedat: "2024.12.05" },
    { id: 3, email: "minjoon@example.com", name: "박민준", gender: "M", role: "STUDENT", status: "INACTIVE", createdat: "2024.12.05", updatedat: "2024.12.05" },
    { id: 4, email: "soojin@example.com", name: "김수진", gender: "F", role: "INSTRUCTOR", status: "ACTIVE", createdat: "2024.12.06", updatedat: "2024.12.07" },
    { id: 5, email: "hyunwoo@example.com", name: "최현우", gender: "M", role: "STUDENT", status: "ACTIVE", createdat: "2024.12.08", updatedat: "2024.12.09" },
    { id: 6, email: "jiho@example.com", name: "이지호", gender: "M", role: "MANAGER", status: "INACTIVE", createdat: "2024.12.10", updatedat: "2024.12.10" },
    { id: 7, email: "yujin@example.com", name: "박유진", gender: "F", role: "STUDENT", status: "ACTIVE", createdat: "2024.12.11", updatedat: "2024.12.11" },
    { id: 8, email: "seungwoo@example.com", name: "김승우", gender: "M", role: "STUDENT", status: "BANNED", createdat: "2024.12.12", updatedat: "2024.12.12" },
    { id: 9, email: "eunji@example.com", name: "최은지", gender: "F", role: "MANAGER", status: "ACTIVE", createdat: "2024.12.13", updatedat: "2024.12.14" },
    { id: 10, email: "taehyun@example.com", name: "조태현", gender: "M", role: "STUDENT", status: "INACTIVE", createdat: "2024.12.15", updatedat: "2024.12.16" },
    { id: 11, email: "sumin@example.com", name: "한수민", gender: "F", role: "INSTRUCTOR", status: "BANNED", createdat: "2024.12.17", updatedat: "2024.12.17" },
    { id: 12, email: "jongwoo@example.com", name: "이종우", gender: "M", role: "STUDENT", status: "ACTIVE", createdat: "2024.12.18", updatedat: "2024.12.19" },
    { id: 13, email: "hyejin@example.com", name: "김혜진", gender: "F", role: "MANAGER", status: "ACTIVE", createdat: "2024.12.20", updatedat: "2024.12.21" },
    { id: 14, email: "seungho@example.com", name: "박승호", gender: "M", role: "STUDENT", status: "INACTIVE", createdat: "2024.12.22", updatedat: "2024.12.22" },
    { id: 15, email: "ara@example.com", name: "윤아라", gender: "F", role: "STUDENT", status: "ACTIVE", createdat: "2024.12.23", updatedat: "2024.12.23" },
    { id: 16, email: "hyeonwoo@example.com", name: "김현우", gender: "M", role: "INSTRUCTOR", status: "INACTIVE", createdat: "2024.12.24", updatedat: "2024.12.24" },
    { id: 17, email: "jeongmin@example.com", name: "이정민", gender: "F", role: "STUDENT", status: "BANNED", createdat: "2024.12.25", updatedat: "2024.12.25" },
    { id: 18, email: "jiwoo@example.com", name: "박지우", gender: "M", role: "MANAGER", status: "ACTIVE", createdat: "2024.12.26", updatedat: "2024.12.26" },
    { id: 19, email: "sungmin@example.com", name: "최성민", gender: "M", role: "STUDENT", status: "INACTIVE", createdat: "2024.12.27", updatedat: "2024.12.27" },
    { id: 20, email: "minji@example.com", name: "윤민지", gender: "F", role: "MANAGER", status: "ACTIVE", createdat: "2024.12.28", updatedat: "2024.12.28" },
    { id: 21, email: "yuna@example.com", name: "강유나", gender: "F", role: "INSTRUCTOR", status: "BANNED", createdat: "2024.12.29", updatedat: "2024.12.29" },
    { id: 22, email: "woojin@example.com", name: "정우진", gender: "M", role: "INSTRUCTOR", status: "ACTIVE", createdat: "2024.12.30", updatedat: "2024.12.30" },
    { id: 23, email: "jiyeon@example.com", name: "김지연", gender: "F", role: "STUDENT", status: "INACTIVE", createdat: "2024.12.31", updatedat: "2024.12.31" }

];

const UserList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roleFilter = searchParams.get("role"); // "STUDENT", "TEACHER", "MANAGER" 등

  const [users, setUsers] = useState(initialUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState(""); // 검색 조건
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [editingUserId, setEditingUserId] = useState(null); // 현재 수정 중인 사용자 ID
  const [editedUser, setEditedUser] = useState({}); // 수정 중인 사용자 데이터
  const usersPerPage = 10; //한번에 보여줄 목록 갯수수
  
  // 필터링된 사용자 목록
  const filteredUsers = users.filter((user) => {
    // 검색 조건에 따른 필터링
    if (searchType === "id") return user.id.toString().includes(searchQuery);
    if (searchType === "email") return user.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchType === "name") return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchType === "gender") return user.gender.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchType === "role") return user.role.toLowerCase().includes(searchQuery.toLowerCase());
    if (searchType === "status") return user.status.toLowerCase().includes(searchQuery.toLowerCase());
    return true; // 전체 보기
  }).filter((user) => {
    // URL 기반 필터 (roleFilter)
    if (!roleFilter) return true;
    return user.role === roleFilter;
  });
 
  //간단삭제
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //간단수정
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUserId ? { ...user, ...editedUser } : user
      )
    );
    setEditingUserId(null);
    setEditedUser({});
  };

  return (
    <div className={styles.tableContainer}>
    <h2>{roleFilter ? `${roleFilter} 관리` : "전체 회원 관리"}</h2>
    {/* 검색창 */}
    <div className={styles.searchBar}>
        검색하기
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className={styles.searchSelect}
        >
          <option value="">전체</option>
          <option value="id">ID</option>
          <option value="email">이메일</option>
          <option value="name">이름</option>
          <option value="gender">성별</option>
          <option value="role">등급</option>
          <option value="status">상태</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>이메일</th>
          <th>이름</th>
          <th>성별</th>
          <th>등급</th>
          <th>상태</th>
          <th>등록일</th>
          <th>수정일</th>
          <th>상세정보</th>
          <th>수정</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
            {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email || user.email}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
            </td>
            <td>
            {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name || user.name}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
            </td>
            <td>{user.gender}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
            <td>{user.createdat}</td>
            <td>{user.updatedat}</td>
            <td><a href="detail">상세정보</a></td>
            <td> 
            {editingUserId === user.id ? (
                    <button onClick={handleSave}>저장</button>
                ) : (
                  <button onClick={() => handleEdit(user)}>수정</button>
                )}
            </td>
            <td>
              <button className={styles.actionButton} onClick={() => handleDelete(user.id)}>삭제</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 페이지네이션 */}
    <div className={styles.pagination}>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          className={currentPage === page + 1 ? "active" : ""}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  </div>
  );
};

export default UserList;