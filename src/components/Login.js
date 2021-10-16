import React, { useState } from 'react';

const Login = props => {
    const { handleLogin } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const tryLogin = async e => {
        e.preventDefault();
        document.querySelector('.error').innerHTML = await handleLogin(email, password);
    }

    return (
        <form action="" className="form" id="signup-form" onSubmit={tryLogin}>
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