import React from 'react';
import axios from 'axios';

const Header = () => {
    const logout = async (e) => {
        e.preventDefault();

        axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`)
        .then(() => {
            document.cookie = 'token= ; max-age= 0';
            document.cookie = 'userId= ; max-age= 0';
            document.cookie = 'userRole= ; max-age= 0';

            window.location.reload(false);
        })
        .catch(error => console.log(error))
    }

    return (
        <header className="header">
            <img src="" alt="" className="header__logo" />
            <a href="./" className="header__logout" onClick={e => logout(e)}>Se déconnecter</a>
        </header>
    );
};

export default Header;