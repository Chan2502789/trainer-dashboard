import styles from "../styles/StatCard.module.css";

const StatCard = ({ title, value, button }) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{value}</p>
      <button>{button}</button>
    </div>
  );
};

export default StatCard;
