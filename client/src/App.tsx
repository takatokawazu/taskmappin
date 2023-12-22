import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AuthContext from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { loggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loggedIn && user) {
      console.log(user)
      if (location.pathname !== `/admin/${user._id}`) {
        navigate(`/map/${user._id}`, { replace: true });
      }
    } else {
      if (location.pathname === '/register') {
        navigate('/register', { replace: true });
      }
    }
  }, [loggedIn, user, navigate, location.pathname]);

  return (
    <Routes>
      {(!loggedIn || !user) && (
        <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </>
      )}
      {loggedIn && (
        <>
          <Route path="/map/:id" element={<MapPage />} />
          <Route path="/admin/:username" element={<AdminPage />} />
        </>
      )}
    </Routes>
  );
};

export default App;
