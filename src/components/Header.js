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
                        window.scrollTo(0, 0);
                        setProfileModal(false);
                    }}>
                    <i class="fas fa-home"></i>
                    <span> Accueil</span>
                </a>
                <a href="./"
                    className={`header__navlink ${profileModal && 'header__navlink--active'}`}
                    onClick={e => {
                        e.preventDefault();
                        setProfileModal(true);
                    }}>
                    <i class="fas fa-user"></i>
                    <span> Profil</span>
                </a>
                <a href="./"
                    className="header__navlink"
                    onClick={e => {
                        e.preventDefault();
                        handleLogout();
                    }}>
                    <i class="fas fa-sign-out-alt"></i>
                    <span> Déconnexion</span>
                </a>
            </nav>
        </header>
    );
};

export default Header;