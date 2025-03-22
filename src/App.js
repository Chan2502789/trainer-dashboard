import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ModulesDashboard from "./components/Module";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";
import styles from "./App.css";
import TopicDetail from "./Topic/hardware";
import Feedback from "./components/feedback";

function App() {
  const [moduleVisible, setModuleVisible] = useState(() => {
    const storedValue = localStorage.getItem("moduleVisible");
    return storedValue === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("moduleVisible", moduleVisible);
  }, [moduleVisible]);

  return (
    <div className="app-container">
      <Sidebar setModuleVisible={setModuleVisible} />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={moduleVisible ? <ModulesDashboard /> : <Dashboard />}
          />
          <Route path="/modules/:topicName" element={<TopicDetail />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
