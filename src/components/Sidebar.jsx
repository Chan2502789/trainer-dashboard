import { Link } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import nutanix from "../images/nutanix.png";
import { useState } from 'react';

const Sidebar = ({ setModuleVisible }) => {
  const [active, setActive] = useState('Dashboard');

  const handleDashboardClick = () => {
    setModuleVisible(false);
    setActive('Dashboard');
  };

  const handleModuleClick = () => {
    setModuleVisible(true);
    setActive('Modules');
  };

  return (
    <aside className={styles.sidebar}>
      <img src={nutanix} alt="NUTANIX Logo" className={styles.logo} />
      <ul className={styles.menu}>
        <li onClick={handleDashboardClick}>
          <span className={`${styles.menuItem} ${active === 'Dashboard' ? styles.active : ''}`}>Dashboard</span>
        </li>
        <li>
          <Link to="/users" className={active === 'Users' ? styles.active : ''}>Users</Link>
        </li>
        <li>
          <Link to="/schedule" className={active === 'Schedule' ? styles.active : ''}>Schedule</Link>
        </li>
        <li onClick={handleModuleClick}>
          <span className={`${styles.menuItem} ${active === 'Modules' ? styles.active : ''}`}>
            Modules
          </span>
        </li>
        <li>
          <Link to="/feedback" className={active === 'Feedback' ? styles.active : ''}>Feedback Portal</Link>
        </li>
        <li>
          <Link to="/intern-info" className={active === 'InternInfo' ? styles.active : ''}>Intern Information</Link>
        </li>
        <li>
          <Link to="/leaderboard" className={active === 'Leaderboard' ? styles.active : ''}>Intern Leaderboard</Link>
        </li>
        <li>
          <Link to="/emails" className={active === 'Emails' ? styles.active : ''}>Emails</Link>
        </li>
        <li>
          <Link to="/logout" className={active === 'Logout' ? styles.active : ''}>Log Out</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
