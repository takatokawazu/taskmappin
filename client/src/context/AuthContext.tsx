import axios from 'axios';
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UserInfo {
  username: any;
  // ここにユーザー情報の型定義を追加する
  usename: string;
  _id: string
}

interface AuthContextProps {
  loggedIn: boolean | undefined;
  getLoggedIn: () => Promise<void> | undefined;
  user: UserInfo | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>> | undefined;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = (props) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  const getLoggedIn = async () => {
    const loggedInRes = await axios.get('/api/users/loggedIn');
    setLoggedIn(loggedInRes.data);
  };

  useEffect(() => {
    getLoggedIn();
  }, [loggedIn]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    setUser(userInfo);

    if (!userInfo || !loggedIn) {
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
