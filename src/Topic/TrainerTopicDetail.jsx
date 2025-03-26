import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./TrainerTopicDetail.module.css"; //TopicDetail.module.css to TrainerTopicDetail.module.css
import Navbar from "../components/TrainerNavbar"; // Navbar to TrainerNavbar

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const TrainerTopicDetail = () => {
  //TopicDetail to TrainerTopicDetail
  const location = useLocation();
  const [topic, setTopic] = useState(location.state?.topic || null);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

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

  const handleDoubleClick = () => {
    setNewTopicName(topic?.name || "Unknown Topic");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!newTopicName.trim()) return;
    const updatedTopics = JSON.parse(localStorage.getItem("topics")) || [];
    const updated = updatedTopics.map((t) =>
      t.name === topic.name ? { ...t, name: newTopicName } : t
    );
    localStorage.setItem("topics", JSON.stringify(updated));
    setTopic((prev) => ({ ...prev, name: newTopicName }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

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
      newFiles.push({ name: file.name, type, base64: base64 });
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const closeModal = () => setActiveFile(null);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>HARDWARE</h2>
        </div>

        <div className={styles.editableContainer}>
          {isEditing ? (
            <div className={styles.inlineEdit}>
              <input
                type="text"
                value={newTopicName}
                onChange={(e) => setNewTopicName(e.target.value)}
                className={styles.editInput}
                autoFocus
              />
              <button onClick={handleSave} className={styles.saveBtn}>
                Save
              </button>
              <button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
            </div>
          ) : (
            <h3 className={styles.subHeading} onDoubleClick={handleDoubleClick}>
              {topic ? topic.name : "Unknown Topic"}
            </h3>
          )}
        </div>
        <br></br>
        <br></br>

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
                <button
                  className={styles.closeBtn}
                  title="Delete"
                  onClick={() => {
                    const confirmed = window.confirm(`Delete ${file.name}?`);
                    if (confirmed) {
                      const updatedFiles = files.filter((_, i) => i !== index);
                      setFiles(updatedFiles);
                    }
                  }}
                >
                  ✕
                </button>

                <button
                  className={styles.downloadBtn}
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = file.base64;
                    link.download = file.name;
                    link.click();
                  }}
                >
                  ⬇
                </button>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerTopicDetail; //TopicDetail to TrainerTopicDetail
