import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decodeJwt } from '../utils/tokenDecode';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get('/api/users/loggedIn');
    const decodedToken = decodeJwt(loggedInRes.data);
    if(decodedToken) {
      setUser(decodedToken.payload)
    }
    setLoggedIn(loggedInRes.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);

  useEffect(() => {
    if (!user || !loggedIn) {
      if (location.pathname === '/register') {
        navigate('/register', { replace: true });
      } else {
        navigate('/');
      }
    }
  }, [navigate, location.pathname, loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
