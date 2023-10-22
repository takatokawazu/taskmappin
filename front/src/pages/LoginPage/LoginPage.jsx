import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(' ');
};

const LoginPage = () => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate(`/map/${username}`);
  };

  const handleValueChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <p className="logo">GeoCall</p>
        <input
          className="l_page_input"
          value={username}
          onChange={handleValueChange}
        />
        <button
          disabled={!isUsernameValid(username)}
          onClick={handleLogin}
          className="l_page_login_button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
