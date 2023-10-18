import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';
import LoginButton from './LoginButton';
import LoginInput from './LoginInput';
import Logo from './Logo';
import './LoginPage.css';
import { proceedWithLogin } from '../stores/actions/loginPageAction';

const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(' ');
};

const LoginPage = () => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    const fetchData = () => {
      connectWithSocketIOServer();
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            proceedWithLogin({
              username,
              coords: {
                lng: position.coords.longitude || process.env.DEFAULT_LONTITUDE,
                lat: position.coords.latitude || process.env.DEFAULT_LATITUDE,
              },
            });
          },
          (error) => {
            console.error('位置情報の取得に失敗しました: ' + error.message);
          }
        );
      } else {
        console.error('このブラウザは位置情報をサポートしていません。');
      }
    };
    fetchData();
    navigate(`/map/${username}`);
  };

  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <LoginInput username={username} setUsername={setUsername} />
        <LoginButton
          disabled={!isUsernameValid(username)}
          onClickHandler={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
