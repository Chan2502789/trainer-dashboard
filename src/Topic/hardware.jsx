// components/TopicDetail.jsx
import React from "react";
import styles from "./TopicDetail.module.css";

const TopicDetail = () => {
  const files = [
    { name: "Day1.pdf", type: "pdf" },
    { name: "Day1.mpv4", type: "video" },
    { name: "Day2.pdf", type: "pdf" },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>HARDWARE</h2>
      <h3 className={styles.subHeading}>Datacenter Evolution</h3>

      <div className={styles.buttons}>
        <button className={styles.uploadBtn}>Upload Docs</button>
        <button className={styles.uploadBtn}>Upload Video</button>
      </div>

      <div className={styles.fileList}>
        {files.map((file, index) => (
          <div className={styles.fileBox} key={index}>
            <span>{file.name}</span>
            <div className={styles.actions}>
              <button className={styles.viewBtn}>View</button>
              <span className={styles.arrow}>↓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicDetail;
