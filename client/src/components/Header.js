import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CREATE_DEVICE_ROUTE, ADMIN_ROUTE } from '../utils/consts';
import { useUserStore } from '../store/UserStore'; // Импортируем кастомный хук для использования состояния пользователя

const Header = () => {
  const { user, logout } = useUserStore(); // Достаем состояние пользователя и функцию logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Устанавливаем isAuth в false и сбрасываем роль
    navigate(SHOP_ROUTE); // Переход на главную страницу после выхода
  };

  return (
    <header>
      <nav>
        <NavLink to={SHOP_ROUTE}>Главная</NavLink> {/* Ссылка на главную страницу */}
        {!user.isAuth ? (
          // Если пользователь не авторизован, отображаем ссылки на вход и регистрацию
          <>
            <NavLink to={LOGIN_ROUTE}>Вход</NavLink>
            <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
          </>
        ) : (
          <>
            {/* Если пользователь авторизован */}
            {user.role === 'SUPPLIER' && (
              <NavLink to={CREATE_DEVICE_ROUTE}>Создать товар</NavLink> // Ссылка для поставщика
            )}
            {user.role === 'ADMIN' && (
              <NavLink to={ADMIN_ROUTE}>Панель Администратора</NavLink> // Ссылка для администратора
            )}
            <button onClick={handleLogout}>Выйти</button> {/* Кнопка выхода */}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
