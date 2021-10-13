import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const errorDisplay = document.querySelector('.error');

    const handleLogIn = async e => {
        e.preventDefault();

        try {
            const maxAge = 2 * 86400000; // 2 days
            const { data } = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/auth/login`,
                data: {
                    email,
                    password
                }
            });
            document.cookie = `token=${data.token}; max-age=${maxAge}`;
            window.location.reload(false);
        } catch (error) {
            errorDisplay.innerHTML = error.response.data.message;
        }
    }

    return (
        <form action="" className="form" id="signup-form" onSubmit={handleLogIn}>
            <div className="error"></div>

            <label htmlFor="email">Email&nbsp;:</label>
            <input
                type="text"
                name="email"
                id="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <br />

            <label htmlFor="password">Mot de passe&nbsp;:</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <br />

            <button type="submit">Se connecter</button>
        </form>
    );
};

export default Login;