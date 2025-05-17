import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import PublicStatusPage from "./pages/PublicStatusPage";
// You can add Admin pages here later

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PublicStatusPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
