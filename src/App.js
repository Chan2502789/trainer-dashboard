import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import styles from "./App.css";
import TopicDetail from "./Topic/hardware";
import Feedback from "./components/feedback";
import InternInfo from "./components/interninfo";
import ModulesDashboard from "./components/Module";

function App() {
  const [moduleVisible, setModuleVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("moduleVisible", moduleVisible);
  }, [moduleVisible]);

  return (
    <div className="app-container">
      <Sidebar setModuleVisible={setModuleVisible} />
      <div className="content">
        <Routes>
          <Route path="/" element={<ModulesDashboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/intern-info" element={<InternInfo />} />
          <Route path="/modules/:topicName" element={<TopicDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
