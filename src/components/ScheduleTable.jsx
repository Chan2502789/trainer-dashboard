import styles from "../styles/ScheduleTable.module.css";

const rows = [
  { name: "Hardware", start: "3.5", end: "5.7", status: "Ongoing" },
  { name: "Linux", start: "3.5", end: "5.1", status: "Completed" },
  { name: "Hardware", start: "3.7", end: "5.1", status: "Ongoing" },
];

const ScheduleTable = () => {
  return (
    <div className={styles.tableWrapper}>
      <h2>Schedule</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{row.name}</td>
              <td>{row.start}</td>
              <td>{row.end}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
