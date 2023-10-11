import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMyLocation } from '../MapPage/mapSlice';
import { connectWithSocketIOServer } from '../socketConnection/socketConn';
import LoginButton from './LoginButton';
import LoginInput from './LoginInput';
import Logo from './Logo';
import './LoginPage.css';
import { getFakeLocation } from './FAKE_LOCATION';
import { proceedWithLogin } from '../stores/actions/loginPageAction';

const isUsernameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(' ');
};

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [locationErrorOccurred, setLocationErrorOccurred] = useState(false);

  const myLocation = useSelector((state) => state.map.myLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    proceedWithLogin({
      username,
      coords: {
        lng: myLocation.lng,
        lat: myLocation.lat,
      },
    });
    navigate('/map');
  };

  const onSucess = (position) => {
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  console.log(myLocation);

  const onError = (error) => {
    console.log('Error occured!');
    console.log(error);
    setLocationErrorOccurred(true);
  };

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   onSucess,
    //   onError,
    //   locationOptions
    // );
    onSucess(getFakeLocation());
  }, []);

  useEffect(() => {
    console.log(myLocation);
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
