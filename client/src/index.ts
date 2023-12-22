import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/stores/store';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom'; // 別名 'Router' を使用

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <Router>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </Router>
);
