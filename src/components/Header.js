import React from 'react';
import {ReactComponent as Logo} from '../assets/icon-left-font.svg';

const Header = props => {
    const { handleLogout, setProfileModal } = props;

    return (
        <header className="header">
            <a href="./"
                className="header__home"
                onClick={e => {
                    e.preventDefault();
                    setProfileModal(false);
                }}>
                <Logo className="header__logo" />
            </a>
            <nav className="header__nav">
                <a href="./"
                    className="header__profile"
                    onClick={e => {
                        e.preventDefault();
                        setProfileModal(true);
                    }}>
                    Profil
                </a>
                <a href="./"
                    className="header__logout"
                    onClick={e => {
                        e.preventDefault();
                        handleLogout();
                    }}>
                    Se déconnecter
                </a>
            </nav>
        </header>
    );
};

export default Header;