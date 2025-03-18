import { Link } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import nutanix from "../images/nutanix.png";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <img src={nutanix } alt="NUTANIX Logo" className={styles.logo} />
      <ul className={styles.menu}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/schedule">Schedule</Link>
        </li>
        <li>
          <Link to="/modules">Modules</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback Portal</Link>
        </li>
        <li>
          <Link to="/intern-info">Intern Information</Link>
        </li>
        <li>
          <Link to="/leaderboard">Intern Leaderboard</Link>
        </li>
        <li>
          <Link to="/emails">Emails</Link>
        </li>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
