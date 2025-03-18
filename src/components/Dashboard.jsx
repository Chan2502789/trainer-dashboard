import styles from "../styles/Dashboard.module.css";
import Header from "./Header";
import ScheduleTable from "./ScheduleTable";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <main className={styles.mainContent}>
        <Header />
        <ScheduleTable />
      </main>
    </div>
  );
};

export default Dashboard;
