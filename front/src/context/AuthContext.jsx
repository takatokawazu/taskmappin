import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState(undefined);

  const navigate = useNavigate();

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get(
      'http://localhost:3003/api/users/loggedIn'
    );

    setLoggedIn(loggedInRes.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (!userInfo || !loggedIn) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
