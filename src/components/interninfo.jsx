import React, { useState } from "react";
import styles from "../styles/interninfo.module.css";
import Navbar from "./navbar";

const InterInfo = () => {
  const [users, setUsers] = useState([
    {
      id: "630343eb94c2812e4cd7e45d",
      username: "Devid434",
      email: "devidbom232@gmail.com",
    },
    {
      id: "6303234eb94c2812e4cd7e45e",
      username: "Johnn434",
      email: "john03434@gmail.com",
    },
    {
      id: "6303234eb94c2812e4cd7e45e",
      username: "Johnn434",
      email: "john03434@gmail.com",
    },
    {
      id: "6303234eb94c2812e4cd7e45e",
      username: "Johnn434",
      email: "john03434@gmail.com",
    },

    {
      id: "e40343eb94c2812e4cd7e4233",
      username: "Dilvib1233",
      email: "dilvibhasanjohn1233@gmail.com",
    },
    {
      id: "930343eb94c2812e4cd7e45g",
      username: "DoeJelia88",
      email: "doejelia88@gmail.com",
    },
    {
      id: "60443eb94c2812e4cd7e45ii",
      username: "Lucas0984",
      email: "lucashossel@gmail.com",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "" });

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email)
      return alert("Please enter all details!");
    const newUserData = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
    };
    setUsers([...users, newUserData]);
    setShowForm(false);
    setNewUser({ username: "", email: "" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <button className={styles.addUserBtn} onClick={() => setShowForm(true)}>
          Add New User
        </button>

        {showForm && (
          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Add New User</h3>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <input
                className={styles.inputField}
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <div className={styles.buttonGroup}>
                <button className={styles.saveBtn} onClick={handleAddUser}>
                  Save
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>SRE Intern</td>
                <td>
                  <button className={styles.viewBtn}>View</button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterInfo;
