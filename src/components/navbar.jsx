import { useState } from "react";
import styles from "../styles/navbar.module.css";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.navbar}>
      <div className={styles.rightIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <FaBars className={styles.icon} />
        {menuOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownItem}>Dark Mode</div>
            <div className={styles.dropdownItem}>Profile</div>
            <div className={styles.dropdownItem}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
