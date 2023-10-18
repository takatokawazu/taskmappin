import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMyLocation } from '../MapPage/mapSlice';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';
import LoginButton from './LoginButton';
import LoginInput from './LoginInput';
import Logo from './Logo';
import './LoginPage.css';
import { getCurrentPosition } from '../utils/location';
import { proceedWithLogin } from '../stores/actions/loginPageAction';
import { createOnSuccess, createOnError } from '../utils/locationHandler'; // ここでインポート

const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(' ');
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);

  const myLocation = useSelector((state) => state.map.myLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSuccess = createOnSuccess(dispatch, setMyLocation);
  const onError = createOnError(setLocationErrorOccurred);

  const handleLogin = async () => {
    await getCurrentPosition(onSuccess, onError);
    proceedWithLogin({
      username,
      coords: {
        lng: myLocation.lng,
        lat: myLocation.lat,
      },
    });
    navigate(`/map/${username}`);
  };

  useEffect(() => {
    getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    if (myLocation) {
      connectWithSocketIOServer();
    }
  }, [myLocation]);

  return (
    <div className="l_page_main_container">
      <div className="l_page_box">
        <Logo />
        <LoginInput username={username} setUsername={setUsername} />
        <LoginButton
          disabled={!isUsernameValid(username) || locationErrorOccurred}
          onClickHandler={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
