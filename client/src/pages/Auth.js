import React, { useState } from 'react';
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useUserStore } from "../store/UserStore"; 

const Auth = () => {
    const { user, login: setUserLogin } = useUserStore();  
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');  
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const isEmailValid = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const phonePattern = /^((\+7)|8)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}$/;

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                if (!isEmailValid(email)) {
                    setError('Некорректный email');
                    return;
                } else {
                
                    data = await login(email, password);
                }
            } else {
                if (!isEmailValid(email)) {
                    setError('Некорректный email');
                    return;
                } else if (password.length < 6) {
                    setError('Пароль должен быть длиннее 6 символов');
                    return;
                } else if (!name) {
                    setError('Заполните имя');
                    return;
                } else if (!phonePattern.test(phone)) {
                    setError('Некорректный телефон');
                    return;
                } else {
                    data = await registration(name, phone, email, password, role);
                }
            }

           
            setUserLogin(data.role);  
            navigate(SHOP_ROUTE);
        } catch (e) {
            setError(e.response?.data?.message || "Ошибка входа/регистрации");
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Авторизация' : "Регистрация"}</h2>
            {error && <span>{error}</span>}
            <input
                placeholder="Введите ваш email..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
            />
            <input
                placeholder="Введите ваш пароль..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
            />
            {!isLogin && (
                <>
                    <input
                        placeholder="Введите ваше имя..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Введите ваш номер телефона..."
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="USER">Покупатель</option>
                        <option value="SUPPLIER">Поставщик</option>
                        <option value="ADMIN">Администратор</option>
                    </select>
                </>
            )}
            <button onClick={click}>
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
            {isLogin ? (
                <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></div>
            ) : (
                <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
            )}
        </div>
    );
};

export default Auth;
