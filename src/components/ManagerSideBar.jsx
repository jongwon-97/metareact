import React , { useState } from "react";
import styles from "../css/manager/ManagerSideBar.module.css";

const ManagerSideBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div className={`${styles.sidebar}`}>
      <div className="sb-sidenav-menu">     
        {/* Interface Section */}
        <div className={`${styles.sidebarSection}`}>
           
          {/* Home */}
          <a className={`${styles.link} sidebar-link`} href="http://localhost:8091/">
          <i className="bi bi-house-door me-2"></i> {/* Home 아이콘 */}
          Home
          </a>

          {/* 개인정보 */}
          <a className={`${styles.link} sidebar-link`} href="http://localhost:8091/manager/mypage">
          <i className="bi bi-person-circle me-2"></i> {/* 개인정보 아이콘 */}
          개인정보
          </a>

          {/* 통계관리 섹션 */}
          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-bar-chart me-2"></i>
          <a className={`${styles.hlink} sidebar-link`} href="#">
          통계관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="#" className={styles.subLink}>
                전체 회원 증감율
              </a>
              <a href="#" className={styles.subLink}>
                학생 증감율
              </a>
              <a href="#" className={styles.subLink}>
                강사 증감율 
              </a>
              <a href="#" className={styles.subLink}>
                강의 증감율
              </a>
            </div>
          )}
          </div>
          

          {/* 회원관리 */}
          <a className={`${styles.link} sidebar-link`} href="/view/manager/users/list">
          <i className="bi bi-people me-2"></i> {/* 개인정보 아이콘 */}
          회원관리
          </a>

          {/* 회원관리 */}
          <a className={`${styles.link} sidebar-link`} href="/view/manager/KDT/list">
          <i className="bi bi-book"></i> {/* 개인정보 아이콘 */}
          국비 과정 조회
          </a>
      
          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-card-list"></i> {/* 게시판관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="#">
          게시판관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="#" className={styles.subLink}>
                게시글 작성
              </a>
              <a href="#" className={styles.subLink}>
                게시판 목록 조회
              </a>
            </div>
          )}
          </div>

          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-person-workspace"></i> {/* 강의관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="#">
          강의관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="#" className={styles.subLink}>
                강의등록
              </a>
              <a href="#" className={styles.subLink}>
                강의목록조회  
              </a>
              <a href="#" className={styles.subLink}>
                강의 승인 대기 목록
              </a>
            </div>
          )}
          </div>

          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-star"></i> {/* 강의관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="#">
          리뷰관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="#" className={styles.subLink}>
                국비 리뷰 목록 조회
              </a>
              <a href="#" className={styles.subLink}>
                강사 리뷰 목록 조회
              </a>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSideBar;
