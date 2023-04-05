import React from 'react';
import s from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://funart.pro/uploads/posts/2021-04/thumbs/1617238749_4-p-oboi-snezhnie-gori-4.jpg' />
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
            : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;

// {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink> } - если у нас в пропсах сидит isAuth, т.е. мы авторизованы, то мы покажем логин (тоже в пропсах сидит), в противном случае покажем ссылку на авторизацию