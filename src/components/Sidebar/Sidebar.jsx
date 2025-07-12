import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.expanded : styles.collapsed
      }`}
    >
      {/* Hamburger / Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        title={isOpen ? "Kapat" : "Aç"}
        style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        &#9776; {/* Hamburger icon */}
      </button>

      {/* Logo ve Menü sadece açıkken göster */}
      <div className={!isOpen ? styles.collapsedContent : ""}>
        <nav>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            title="Dashboard"
          >
            <span className={styles.icon}>🏠</span>
            {isOpen && "Dashboard"}
          </NavLink>

          <NavLink
            to="/logs"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            title="Logs"
          >
            <span className={styles.icon}>📜</span>
            {isOpen && "Logs"}
          </NavLink>

          <NavLink to="/login" className={styles.navLink} title="Çıkış">
            <span className={styles.icon}>🚪</span>
            {isOpen && "Çıkış"}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
