import React from 'react';
import nutanix from '../images/nutanix.png';
import styles from '../styles/LogoContainer.module.css';

function LogoContainer() {
  return (
    <div className={styles.logoContainer}>
      <img src={nutanix} alt="NUTANIX Logo" className={styles.logo} />
    </div>
  );
}

export default LogoContainer;
