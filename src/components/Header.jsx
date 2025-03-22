import StatCard from "./StatCard";
import styles from "../styles/Header.module.css";
import LogoContainer from "./LogoContainer";

const data = [
  { title: "Users", value: 232, button: "View all users" },
  { title: "Modules", value: 34, button: "View Module" },
  { title: "Schedule", value: 107, button: "View Schedule" },
  { title: "Data Space", value: 444, button: "View Data Space" },
];

const Header = () => {
  return (
    <div className={styles.header}>
      <LogoContainer />
      {data.map((item, i) => (
        <StatCard key={i} {...item} />
      ))}
    </div>
  );
};

export default Header;
