import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>
      <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);