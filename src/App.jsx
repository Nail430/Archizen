import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chargement from "./components/Chargement.jsx"; 
import Inscription from "./pages/Inscription";
import MotDP from "./pages/MotDP";
import Otp from "./pages/Otp";
import Board from "./pages/Board.jsx";
import Connexion from "./pages/Connexion.jsx";
import HomePage from "./pages/HomePage.jsx";
import House2D  from "./pages/Plan2D.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Chargement />
  }

  return (
    <Router>
      <Routes>
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/motdp" element={<MotDP />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/2D" element={<House2D  />} />
      </Routes>
    </Router>
  );
}

export default App;
