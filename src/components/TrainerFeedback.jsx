import styles from "../styles/TrainerFeedback.module.css"; //feedback.module.css to TrainerFeedback.module.css
import { useState } from "react";
import TrainerNavbar from "./TrainerNavbar"; //Navbar to TrainerNavbar

const TrainerFeedbackForm = () => {
  //Feedback to TrainerFeedbackForm

  const [internName, setInternName] = useState("");
  const [score, setScore] = useState(0);
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");

  const handleReset = () => {
    setInternName("");
    setScore(0);
    setStrengths("");
    setWeaknesses("");
  };

  const handleSave = () => {
    const feedbackData = {
      internName,
      score,
      strengths,
      weaknesses,
    };
    console.log("Saved Feedback:", feedbackData);
  };

  return (
    <div>
      <TrainerNavbar /> {/*Navbar to TrainerNavbar */}
      <div className={styles.container}>
        <h3 className={styles.title}>Hardware Feedback</h3>

        <label className={styles.label}>Intern Name</label>
        <select
          className={styles.select}
          value={internName}
          onChange={(e) => setInternName(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Intern 1">Intern 1</option>
          <option value="Intern 2">Intern 2</option>
        </select>

        <label className={styles.label}>Score</label>
        <div className={styles.scoreWrapper}>
          <input
            type="number"
            className={styles.scoreInput}
            value={score}
            onChange={(e) => setScore(e.target.value)}
            min={0}
            max={100}
          />
          <span className={styles.scoreRange}>(0-100)</span>
        </div>

        <label className={styles.label}>Strengths</label>
        <textarea
          className={styles.textarea}
          value={strengths}
          onChange={(e) => setStrengths(e.target.value)}
        />

        <label className={styles.label}>Weaknesses</label>
        <textarea
          className={styles.textarea}
          value={weaknesses}
          onChange={(e) => setWeaknesses(e.target.value)}
        />

        <div className={styles.buttonGroup}>
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerFeedbackForm; //Feedback to TrainerFeedbackForm
