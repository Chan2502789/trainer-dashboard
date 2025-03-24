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

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
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
