import { Link } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import nutanix from "../images/nutanix.png";
import { useState } from "react";

const Sidebar = ({ setModuleVisible }) => {
  const [active, setActive] = useState("Dashboard");

 const handleDashboardClick = () => {
    setModuleVisible((prev) => !prev);
    setActive("Dashboard");
  };

  const handleModuleClick = () => {
    setModuleVisible(true);
    setActive("Modules");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={nutanix} alt="NUTANIX Logo" className={styles.logo} />
      </div>
      <ul className={styles.menu}>
        <li className={styles.sectionTitle}>MAIN</li>
        <li className={styles.navItem} onClick={handleDashboardClick}>
          <Link
            to="/"
            className={`${styles.menuItem} ${
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
            className={active === "Feedback" ? styles.active : ""}
          >
            Feedback Portal
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/intern-info"
            className={active === "InternInfo" ? styles.active : ""}
          >
            Intern Information
          </Link>
        </li>

        <li className={styles.navItem}>
          <Link
            to="/emails"
            className={active === "Emails" ? styles.active : ""}
          >
            Emails
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/logout"
            className={active === "Logout" ? styles.active : ""}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
