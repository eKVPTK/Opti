// src/App.js
import React from 'react';
import AppRouter from './components/AppRouter';
import { useUserStore } from './store/UserStore';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const { user } = useUserStore();

  return (
    <div>
      <Header/>
      <AppRouter />
      <Footer/>
    </div>
  );
};

export default App;
