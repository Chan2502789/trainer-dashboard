import React from "react";
import nutanix from "../images/nutanix.png";
import styles from "../styles/TrainerLogoContainer.module.css"; // Logocontainer.module.css to TrainerLogoContainer.module.css

function TrainerLogoContainer() {
  // LogoContainer to TrainerLogoContainer
  return (
    <div className={styles.logoContainer}>
      <img src={nutanix} alt="NUTANIX Logo" className={styles.logo} />
    </div>
  );
}

export default TrainerLogoContainer; // LogoContainer to TrainerLogoContainer
