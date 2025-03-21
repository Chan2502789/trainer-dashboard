// components/ModulesDashboard.jsx
import React, { useState, useEffect } from "react";
import styles from "../styles/Module.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ModulesDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [addingTopic, setAddingTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDate, setNewTopicDate] = useState("");
  const [newTopicFiles, setNewTopicFiles] = useState([]);
  const [editingIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const initialTopics = [
      {
        id: uuidv4(),
        name: "Datacenter Evolution",
        date: "16/03/25",
        uploads: 2,
        files: [],
      },
      {
        id: uuidv4(),
        name: "Basic Hardware Components",
        date: "17/03/25",
        uploads: 3,
        files: [],
      },
      {
        id: uuidv4(),
        name: "Datacenter Power and Cooling",
        date: "18/03/25",
        uploads: 0,
        files: [],
      },
    ];

    const savedTopics = localStorage.getItem("topics");

    if (savedTopics) {
      try {
        const parsed = JSON.parse(savedTopics);
        setTopics(parsed);
      } catch (e) {
        console.error("Failed to parse topics from localStorage:", e);
        localStorage.removeItem("topics"); // Clear corrupted data
        setTopics(initialTopics); // fallback
      }
    } else {
      setTopics(initialTopics);
    }

    if (!savedTopics) {
      localStorage.setItem("topics", JSON.stringify(initialTopics));
    }
  }, []);

  const handleAddTopicClick = () => {
    setAddingTopic(true);
  };

  const handleDeleteTopicClick = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  const handleSaveTopicClick = async () => {
    if (!newTopicName.trim() || !newTopicDate.trim()) {
      alert("Topic name and date are required.");
      return;
    }

    const filesArray = newTopicFiles.length
      ? await Promise.all(
          Array.from(newTopicFiles).map((file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  name: file.name,
                  type: file.type.startsWith("video") ? "video" : "pdf",
                  data: reader.result, // base64 string
                });
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
          })
        )
      : [];

    const newTopic = {
      id: uuidv4(),
      name: newTopicName.trim(),
      date: newTopicDate.trim(),
      uploads: filesArray.length,
      files: filesArray,
    };

    const updatedTopics = [...topics, newTopic];
    setTopics(updatedTopics);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));

    setAddingTopic(false);
    setNewTopicName("");
    setNewTopicDate("");
    setNewTopicFiles([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>HARDWARE</h2>
      </div>

      <div className={styles.buttons}>
        <button className={styles.addBtn} onClick={handleAddTopicClick}>
          Add topics
        </button>
        <button className={styles.editBtn}>Edit topics</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Topics</th>
            <th>Date</th>
            <th>Uploads</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic, index) => (
            <tr key={topic.id}>
              <td>
                {editingIndex === index ? (
                  <input type="text" value={topic.name} />
                ) : (
                  topic.name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input type="text" value={topic.date} />
                ) : (
                  topic.date
                )}
              </td>
              <td>{topic.uploads}</td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() =>
                    navigate(
                      `/modules/${encodeURIComponent(
                        topic.name.toLowerCase().replace(/\s+/g, "-")
                      )}`,
                      {
                        state: { topic },
                      }
                    )
                  }
                >
                  View
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteTopicClick(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {addingTopic && (
            <tr>
              <td>
                <input
                  type="text"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="Enter topic name"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newTopicDate}
                  onChange={(e) => setNewTopicDate(e.target.value)}
                  placeholder="Enter date"
                />
              </td>
              <td>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.mp4,.mov,.doc,.docx"
                  onChange={(e) => setNewTopicFiles(e.target.files)}
                />
              </td>
              <td>
                <button onClick={handleSaveTopicClick}>Save</button>
                <button
                  onClick={() => {
                    setAddingTopic(false);
                    setNewTopicName("");
                    setNewTopicDate("");
                    setNewTopicFiles([]);
                  }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModulesDashboard;
