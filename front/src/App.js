import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPage from './pages/AdminPage/AdminPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/map/:username" element={<MapPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/:username" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
