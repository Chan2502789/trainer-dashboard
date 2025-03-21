// components/TopicDetail.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./TopicDetail.module.css";
import { fileSave } from "browser-fs-access";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const TopicDetail = () => {
  const location = useLocation();
  const [topic, setTopic] = useState(location.state?.topic || null);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    if (!topic) {
      const savedTopics = JSON.parse(localStorage.getItem("topics")) || [];
      const topicNameFromUrl = window.location.pathname.split("/").pop();
      const decodedName = decodeURIComponent(topicNameFromUrl).replace(
        /-/g,
        " "
      );
      const found = savedTopics.find(
        (t) => t.name.toLowerCase() === decodedName.toLowerCase()
      );
      setTopic(found);
      setFiles(found?.files || []);
    } else {
      setFiles(topic.files || []);
    }
  }, [topic]);

  useEffect(() => {
    if (topic) {
      const updatedTopics = JSON.parse(localStorage.getItem("topics")) || [];
      const updated = updatedTopics.map((t) =>
        t.name === topic.name ? { ...t, files } : t
      );
      localStorage.setItem("topics", JSON.stringify(updated));
    }
  }, [files]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeFile && e.code === "Space") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFile]);

  const handleUpload = async (event, type) => {
    const uploadedFiles = Array.from(event.target.files);

    const filtered = uploadedFiles.filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      if (type === "pdf")
        return ext === "pdf" || ext === "doc" || ext === "docx";
      if (type === "video") return ext === "mp4";
      return false;
    });

    const newFiles = [];
    for (const file of filtered) {
      if (file.size > 3 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum file size is 3MB.`);
        continue;
      }

      const base64 = await toBase64(file);
      newFiles.push({
        name: file.name,
        type,
        base64: base64,
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const closeModal = () => setActiveFile(null);

  const handleSaveToFileSystem = async () => {
    if (!activeFile) return;

    try {
      await fileSave(
        new Blob([
          new Uint8Array(
            activeFile.base64
              .substring(activeFile.base64.indexOf(",") + 1)
              .match(/[\w-]+/g)
              .map(function (el) {
                return parseInt(el, 36);
              })
          ),
        ]),
        {
          fileName: activeFile.name,
        }
      );
    } catch (error) {
      console.error("Error saving file:", error);
      alert("Failed to save file to file system.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>HARDWARE</h2>
      </div>
      <h3 className={styles.subHeading}>
        {topic ? topic.name : "Unknown Topic"}
      </h3>

      <div className={styles.buttons}>
        <label className={styles.uploadBtn}>
          Upload Docs
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            multiple
            onChange={(e) => handleUpload(e, "pdf")}
          />
        </label>

        <label className={styles.uploadBtn}>
          Upload Video
          <input
            type="file"
            accept=".mp4"
            style={{ display: "none" }}
            multiple
            onChange={(e) => handleUpload(e, "video")}
          />
        </label>
      </div>

      <div className={styles.fileList}>
        {files.map((file, index) => (
          <div className={styles.fileBox} key={index}>
            <span>{file.name}</span>
            <div className={styles.actions}>
              <button
                className={styles.viewBtn}
                onClick={() => setActiveFile(file)}
              >
                View
              </button>
              <span className={styles.arrow}>↓</span>
            </div>
          </div>
        ))}
      </div>

      {activeFile && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeModal}>
              ✕
            </button>

            {activeFile.type === "video" ? (
              <video controls className={styles.previewVideo}>
                <source src={activeFile.base64} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={activeFile.base64}
                title={activeFile.name}
                className={styles.previewDoc}
              />
            )}
            <button className={styles.saveBtn} onClick={handleSaveToFileSystem}>
              Save to File System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDetail;
