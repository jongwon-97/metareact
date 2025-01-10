import React , { useState } from "react";
import styles from "../css/instr/InstrSideBar.module.css";

const InstrSideBar = () => {
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
          <a className={`${styles.hlink} sidebar-link`} href="view/admin/userchart">
          통계관리
          </a>
          {showSubMenu && (
            <div className={styles.subMenu}>
              <a href="/admin/userchart" className={styles.subLink}>
                학생증감율
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                강의증감율
              </a>
              <a href="/admin/overview" className={styles.subLink}>
                결제 통계
              </a>
            </div>
          )}
          </div>
          
        
          {/* 개인정보 */}
          <a className={`${styles.link} sidebar-link`} href="/admin/mypage">
          <i className="bi bi-book"></i> {/* 개인정보 아이콘 */}
          국비관리
          </a>
          

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
                강의등록
              </a>
              <a href="/admin/teacherchart" className={styles.subLink}>
                강의목록조회  
              </a>
            </div>
          )}
          </div>

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

          <a className={`${styles.link} sidebar-link`} href="http://localhost:8091/">
          <i className="bi bi-credit-card"></i> {/* 결제관리 아이콘 */}
          결제관리
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default InstrSideBar;
