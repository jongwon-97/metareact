import React , { useState } from "react";
import styles from "../css/student/StudentSideBar.module.css";

const StudentSideBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div className={`${styles.sidebar} sb-sidenav accordion sb-sidenav-dark`}>
      <div className="sb-sidenav-menu">     
        {/* Interface Section */}
        <div className={`${styles.sidebarSection}`}>
           
          {/* Home */}
          <a className={`${styles.link} sidebar-link`} href="http://localhost:8091/">
          <i className="bi bi-house-door me-2"></i> {/* Home 아이콘 */}
          Home
          </a>

          {/* 개인정보 */}
          <a className={`${styles.link} sidebar-link`} href="/student/mypage">
          <i className="bi bi-person-circle me-2"></i> {/* 개인정보 아이콘 */}
          개인정보
          </a>

          {/* 회원관리 */}
          <a className={`${styles.link} sidebar-link`} href="/view/student/KDT/list">
          <i className="bi bi-book"></i> {/* 개인정보 아이콘 */}
          국비 과정 조회
          </a>

          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-card-list"></i> {/* 게시판관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/tables">
          게시판관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                게시글 작성
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                게시판 목록 조회
              </a>
            </div>
          )}
          </div>
          
          {/* 회원관리 */}
          <a className={`${styles.link} sidebar-link`} href="/view/student/KDT/list">
          <i className="bi bi-person-workspace"></i> {/* 개인정보 아이콘 */}
          강의 목록 조회
          </a>
        
          <div className={`${styles.link} ${styles.dropdown}`}
            onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
            onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-star"></i> {/* 강의관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/tables">
          리뷰관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                국비 리뷰 목록 조회
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                강사 리뷰 목록 조회
              </a>
            </div>
          )}
          </div>
          <a className={`${styles.link} sidebar-link`} href="/tables">
          <i className="bi bi-cart"></i> {/* 결제관리 아이콘 */}
          장바구니
          </a>

          <a className={`${styles.link} sidebar-link`} href="/tables">
          <i className="bi bi-credit-card"></i> {/* 결제관리 아이콘 */}
          결제관리
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentSideBar;
