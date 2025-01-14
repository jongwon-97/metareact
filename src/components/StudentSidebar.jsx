import React , { useState } from "react";
import styles from "../css/student/StudentSideBar.module.css";
import { useParams } from "react-router-dom";
const StudentSideBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { kdtSessionId } = useParams(); // URL 파라미터

  return (
    <div className={`${styles.sidebar} sb-sidenav accordion sb-sidenav-dark`}>
      <div className="sb-sidenav-menu">     
        {/* Interface Section */}
        <div className={`${styles.sidebarSection}`}>
           
          {/* Home */}
          <a className={`${styles.link} sidebar-link`} href="/">
          <i className="bi bi-house-door me-2"></i> {/* Home 아이콘 */}
          Home
          </a>

          {/* 개인정보 */}
          <a className={`${styles.link} sidebar-link`} href="/student/mypage">
          <i className="bi bi-person-circle me-2"></i> {/* 개인정보 아이콘 */}
          개인정보
          </a>

          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-book"></i> {/* 게시판관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/student/KDT/list">
          국비 과정 관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href={`view/student/KDT/${kdtSessionId}/att/detail`} className={styles.subLink}>
                출석부
              </a>
              <a href={`/student/KDT/${kdtSessionId}/coureoutline/list`} className={styles.subLink}>
                강의영상
              </a>
              <a href={`/student/KDT/${kdtSessionId}/board/meteriallist`} className={styles.subLink}>
                자료실
              </a>
              <a href={`/student/KDT/${kdtSessionId}/test/list`} className={styles.subLink}>
                시험
              </a>
            </div>
          )}
          </div>

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
          
          {/* 회원관리 */}
          <a className={`${styles.link} sidebar-link`} href="#">
          <i className="bi bi-person-workspace"></i> {/* 개인정보 아이콘 */}
          강의 목록 조회
          </a>
        
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
          <a className={`${styles.link} sidebar-link`} href="/user/cart">
          <i className="bi bi-cart"></i> {/* 결제관리 아이콘 */}
          장바구니
          </a>

          <a className={`${styles.link} sidebar-link`} href="#">
          <i className="bi bi-credit-card"></i> {/* 결제관리 아이콘 */}
          구매 내역
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentSideBar;
