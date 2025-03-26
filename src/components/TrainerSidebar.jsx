import { Link } from "react-router-dom";
import styles from "../styles/TrainerSidebar.module.css"; // sidebar.module.css to TrainerSidebar.module.css
import { useState } from "react";
import TrainerLogoContainer from "./TrainerLogoContainer"; // LogoContainer changes to TrainerLogoContainer

const TrainerSidebar = ({ setModuleVisible }) => {
  //Sidebar to TrainerSidebar
  const [active, setActive] = useState("Dashboard");

  const handleDashboardClick = () => {
    setModuleVisible(false);
    setActive("Dashboard");
  };

  return (
    <aside className={styles.sidebar}>
      {/*Added Link to the Nutanix Logo to navigate to the main page */}
      <Link
        to="/"
        onClick={handleDashboardClick}
        className={styles.logoContainer}
      >
        <TrainerLogoContainer /> {/* LogoContainer to TrainerLogoContainer*/}
      </Link>
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
      </ul>
    </aside>
  );
};

export default TrainerSidebar; //Sidebar to TrainerSidebar
