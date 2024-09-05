// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserStoreProvider } from './store/UserStore';
import { DeviceStoreProvider } from './store/DeviceStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserStoreProvider>
    <DeviceStoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeviceStoreProvider>
  </UserStoreProvider>
);
