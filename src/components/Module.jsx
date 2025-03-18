// components/ModulesDashboard.jsx
import React, { useState } from "react";
import styles from "../styles/Module.module.css";
import { useNavigate } from "react-router-dom";

const ModulesDashboard = () => {
  const [topics, setTopics] = useState([
    { name: "Datacenter Evolution", date: "16/03/25", uploads: 2 },
    { name: "Basic Hardware Components", date: "17/03/25", uploads: 3 },
    { name: "Datacenter Power and Cooling", date: "18/03/25", uploads: 0 },
  ]);
  const navigate = useNavigate();

  const [addingTopic, setAddingTopic] = useState(false);

  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDate, setNewTopicDate] = useState("");
  const [newTopicFiles, setNewTopicFiles] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTopicClick = () => {
    setAddingTopic(true);
  };

  const handleDeleteTopicClick = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
  };

  const handleSaveTopicClick = () => {
    const newTopic = {
      name: newTopicName,
      date: newTopicDate,
      uploads: newTopicFiles.length,
    };

    setTopics([...topics, newTopic]);
    setAddingTopic(false);
    setNewTopicName("");
    setNewTopicDate("");
    setNewTopicFiles([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>HARDWARE</h2>
        <div className={styles.dates}>
          <p>Start Date: 16/03/2025</p>
          <p>End Date: 20/03/2025</p>
        </div>
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
            <tr key={index}>
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
              <td>
                {editingIndex === index ? (
                  <input type="text" value={topic.uploads} />
                ) : (
                  topic.uploads
                )}
              </td>
              <td>
                <button
                  className={styles.viewBtn}
                  onClick={() =>
                    navigate(
                      `/modules/${encodeURIComponent(
                        topic.name.toLowerCase().replace(/\s+/g, "-")
                      )}`
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
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newTopicDate}
                  onChange={(e) => setNewTopicDate(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setNewTopicFiles(e.target.files)}
                />
              </td>
              <td>
                <button onClick={handleSaveTopicClick}>Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModulesDashboard;
