import React , { useState } from "react";
import styles from "../css/AdminSideBar.module.css";

const AdminSideBar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <div className={`${styles.sidebar} sb-sidenav accordion sb-sidenav-dark`}>
      <div className="sb-sidenav-menu">     
        {/* Interface Section */}
        <div className={`${styles.sidebarSection}`}>
           
          {/* Home */}
          <a className={`${styles.link} sidebar-link`} href="/admin/dashboard">
          <i className="bi bi-house-door me-2"></i> {/* Home 아이콘 */}
          Home
          </a>

          {/* 개인정보 */}
          <a className={`${styles.link} sidebar-link`} href="/admin/mypage">
          <i className="bi bi-person-circle me-2"></i> {/* 개인정보 아이콘 */}
          개인정보
          </a>

          {/* 통계관리 섹션 */}
          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-bar-chart me-2"></i>
          <a className={`${styles.hlink} sidebar-link`} href="/admin/mypage">
          통계관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                학생증감율
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                강사증감율
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                강의증감율
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                강의 별점/평점
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                조회
              </a>
            </div>
          )}
          </div>
          
          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-people me-2"></i> {/* 회원관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/view/admin/users/list">
          회원관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/view/admin/users/list?role=STUDENT" className={styles.subLink}>
                학생관리
              </a>
              <a href="/view/admin/users/list?role=INSTRUCTOR" className={styles.subLink}>
                강사관리
              </a>
              <a href="/view/admin/users/list?role=MANAGER" className={styles.subLink}>
                매니저관리
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
            </div>
          )}
          </div>

          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-book"></i> {/* 국비관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/admin/KDT/list">
            국비관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                국비과정등록
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                국비회차등록
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                국비과정조회
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
            </div>
          )}
          </div>

          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-person-workspace"></i> {/* 강의관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/tables">
          강의관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                국비과정등록
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                국비회차등록
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                국비과정조회
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
            </div>
          )}
          </div>
          
          <div className={`${styles.link} ${styles.dropdown}`}
             onMouseEnter={() => setShowSubMenu(true)}   // 마우스를 올리면 하위 메뉴 표시
             onMouseLeave={() => setShowSubMenu(false)}  // 마우스를 떼면 하위 메뉴 숨김
          >
          <i className="bi bi-credit-card"></i> {/* 결제관리 아이콘 */}
          <a className={`${styles.hlink} sidebar-link`} href="/tables">
          결제관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                국비과정등록
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                국비회차등록
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                국비과정조회
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
            </div>
          )}
          </div>

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
                국비과정등록
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                국비회차등록
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                국비과정조회
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                더미
              </a>
            </div>
          )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
