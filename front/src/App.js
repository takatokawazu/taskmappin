import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/map/:username" element={<MapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
