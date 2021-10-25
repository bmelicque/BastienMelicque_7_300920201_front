import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/icon-left-font.svg';

const Header = ({ handleLogout }) => {
    return (
        <header className="header">
            <Logo className="header__logo" />
            <nav className="header__nav">
                <NavLink exact to="./"
                    className="header__navlink"
                    activeClassName="header__navlink--active" >
                    <i className="fas fa-home"></i>
                    <span> Accueil</span>
                </NavLink>
                <NavLink exact to="./profile"
                    className="header__navlink"
                    activeClassName="header__navlink--active" >
                    <i className="fas fa-user"></i>
                    <span> Profil</span>
                </NavLink>
                <a href="./logout"
                    className="header__navlink"
                    onClick={e => {
                        e.preventDefault();
                        handleLogout();
                    }}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Déconnexion</span>
                </a>
            </nav>
        </header>
    );
};

export default Header;