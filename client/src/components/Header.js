import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CREATE_DEVICE_ROUTE, ADMIN_ROUTE } from '../utils/consts';
import { useUserStore } from '../store/UserStore';

const Header = () => {
  const { user, logout } = useUserStore(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate(SHOP_ROUTE); 
  };

  return (
    <header>
      <nav>
        <NavLink to={SHOP_ROUTE}>Главная</NavLink>
        {!user.isAuth ? (
          <>
            <NavLink to={LOGIN_ROUTE}>Вход</NavLink>
            <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
          </>
        ) : (
          <>
            {user.role === 'SUPPLIER' && (
              <NavLink to={CREATE_DEVICE_ROUTE}>Создать товар</NavLink> 
            )}
            {user.role === 'ADMIN' && (
              <NavLink to={ADMIN_ROUTE}>Панель Администратора</NavLink> 
            )}
            <button onClick={handleLogout}>Выйти</button> 
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
