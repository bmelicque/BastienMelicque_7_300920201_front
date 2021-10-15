import React, { useState } from 'react';
import { login } from '../utils/axiosServices';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const errorDisplay = document.querySelector('.error');

    const handleLogIn = async e => {
        e.preventDefault();

        errorDisplay.innerHTML = await login(email, password) || null;
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