import { Routes, Route } from "react-router-dom";
import TrainerSidebar from "./components/TrainerSidebar";
import { useState, useEffect } from "react";
import styles from "./App.css";
import TrainerTopicDetail from "./Topic/TrainerTopicDetail"; // TopicDetail to TrainerTopicDetail
import TrainerFeedbackForm from "./components/TrainerFeedback"; //Feedback to TrainerFeebackForm
import TrainerInterInfo from "./components/TrainerInternInfo"; // InternInfo to TrainerInternInfo
import TrainerModulesDashboard from "./components/TrainerModulesDashboard"; //Module to TrainerModuleDashboard

function App() {
  const [moduleVisible, setModuleVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("moduleVisible", moduleVisible);
  }, [moduleVisible]);

  return (
    <div className="app-container">
      <TrainerSidebar setModuleVisible={setModuleVisible} />
      <div className="content">
        <Routes>
          <Route path="/" element={<TrainerModulesDashboard />} />{" "}
          {/* ModuleDashboard to TrainerModuleDashboard*/}
          <Route path="/feedback" element={<TrainerFeedbackForm />} />{" "}
          {/* Feedback to TrainerFeedbackForm*/}
          <Route path="/intern-info" element={<TrainerInterInfo />} />{" "}
          {/* InternInfo to TrainerInternInfo*/}
          <Route
            path="/modules/:topicName"
            element={<TrainerTopicDetail />}
          />{" "}
          {/* TopicDetal to TrainerTopicDetail*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
