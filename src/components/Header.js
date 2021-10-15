import React from 'react';

const Header = () => {
    const logout = e => {
        e.preventDefault();

        document.cookie = 'token= ; max-age= 0';
        document.cookie = 'userId= ; max-age= 0';
        document.cookie = 'userRole= ; max-age= 0';

        window.location.reload(false);
    }

    return (
        <header className="header">
            <img src="" alt="" className="header__logo" />
            <a href="./" className="header__logout" onClick={e => logout(e)}>Se déconnecter</a>
        </header>
    );
};

export default Header;