import { Link } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import { useState } from "react";
import LogoContainer from "./LogoContainer";

const Sidebar = ({ setModuleVisible }) => {
  const [active, setActive] = useState("Dashboard");

  const handleDashboardClick = () => {
    setModuleVisible(false);
    setActive("Dashboard");
  };

  const handleModuleClick = () => {
    setModuleVisible(true);
    setActive("Modules");
  };

  return (
    <aside className={styles.sidebar}>
      <LogoContainer />
      <ul className={styles.menu}>
        <li className={styles.sectionTitle}>MAIN</li>

        <li className={styles.navItem}>
          <Link
            to="/"
            onClick={handleDashboardClick}
            className={`${styles.menuItem} ${styles.indented} ${
              active === "Dashboard" ? styles.active : ""
            }`}
          >
            Dashboard
          </Link>
        </li>

        <li className={styles.sectionTitle}>LISTS</li>

        <li className={styles.navItem}>
          <Link
            to="/feedback"
            onClick={() => setActive("Feedback")}
            className={`${styles.menuItem} ${styles.indented} ${
              active === "Feedback" ? styles.active : ""
            }`}
          >
            Feedback Portal
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link
            to="/intern-info"
            onClick={() => setActive("InternInfo")}
            className={`${styles.menuItem} ${styles.indented} ${
              active === "InternInfo" ? styles.active : ""
            }`}
          >
            Intern Information
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link
            to="/emails"
            onClick={() => setActive("Emails")}
            className={`${styles.menuItem} ${styles.indented} ${
              active === "Emails" ? styles.active : ""
            }`}
          >
            Emails
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link
            to="/logout"
            onClick={() => setActive("Logout")}
            className={`${styles.menuItem} ${styles.indented} ${
              active === "Logout" ? styles.active : ""
            }`}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
