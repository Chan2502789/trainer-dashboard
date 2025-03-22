import React, { useState, useEffect } from "react";
import styles from "../styles/Module.module.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./navbar";

const ModulesDashboard = () => {
  const [topics, setTopics] = useState([]);
  const [addingTopic, setAddingTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const initialTopics = [
      {
        id: uuidv4(),
        name: "Datacenter Evolution",
        files: [],
      },
      {
        id: uuidv4(),
        name: "Basic Hardware Components",
        files: [],
      },
      {
        id: uuidv4(),
        name: "Datacenter Power and Cooling",
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
        localStorage.removeItem("topics");
        setTopics(initialTopics);
      }
    } else {
      setTopics(initialTopics);
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
    localStorage.setItem("topics", JSON.stringify(newTopics));
  };

  const handleSaveTopicClick = () => {
    if (!newTopicName.trim()) {
      alert("Topic name is required.");
      return;
    }

    const newTopic = {
      id: uuidv4(),
      name: newTopicName.trim(),
      files: [],
    };

    const updatedTopics = [...topics, newTopic];
    setTopics(updatedTopics);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));

    setAddingTopic(false);
    setNewTopicName("");
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>HARDWARE</h2>
          <div className={styles.dateInfo}>
            <p>Start Date: 16/03/2025</p>
            <p>End Date: 20/03/2025</p>
          </div>
        </div>

        {addingTopic && (
          <div className={styles.modalInput}>
            <input
              type="text"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="Enter topic name"
            />
            <div>
              <button onClick={handleSaveTopicClick}>Save</button>
              <button
                onClick={() => {
                  setAddingTopic(false);
                  setNewTopicName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className={styles.buttonRow}>
          <button
            className={styles.iconAddBtn}
            onClick={handleAddTopicClick}
            title="Add Topic"
          >
            ➕
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Topics</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic, index) => (
              <tr key={topic.id}>
                <td>{topic.name}</td>
                <td>
                  <span
                    className={styles.icon}
                    title="Edit"
                    onClick={() =>
                      navigate(
                        `/modules/${encodeURIComponent(
                          topic.name.toLowerCase().replace(/\s+/g, "-")
                        )}`,
                        { state: { topic } }
                      )
                    }
                  >
                    ✏️
                  </span>
                  &nbsp;&nbsp;
                  <span
                    className={styles.icon}
                    title="Delete"
                    onClick={() => handleDeleteTopicClick(index)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModulesDashboard;
