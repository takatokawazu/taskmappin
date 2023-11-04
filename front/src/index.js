import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/stores/store';
import App from './App';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>
);
