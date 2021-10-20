import React from 'react';
import { ReactComponent as Logo } from '../assets/icon-left-font.svg';

const Header = props => {
    const { handleLogout, profileModal, setProfileModal } = props;

    return (
        <header className="header">
            <Logo className="header__logo" />
            <nav className="header__nav">
                <a href="./"
                    className={`header__navlink ${!profileModal && 'header__navlink--active'}`}
                    onClick={e => {
                        e.preventDefault();
                        setProfileModal(false);
                    }}>
                    <i class="fas fa-home"></i> Accueil
                </a>
                <a href="./"
                    className={`header__navlink ${profileModal && 'header__navlink--active'}`}
                    onClick={e => {
                        e.preventDefault();
                        setProfileModal(true);
                    }}>
                    <i class="fas fa-user"></i> Profil
                </a>
                <a href="./"
                    className="header__navlink"
                    onClick={e => {
                        e.preventDefault();
                        handleLogout();
                    }}>
                    <i class="fas fa-sign-out-alt"></i> Se déconnecter
                </a>
            </nav>
        </header>
    );
};

export default Header;