import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = e => {

    }

    return (
        <form action="" className="form" id="signup-form" onSubmit={handleSignUp}>
            <label htmlFor="email">Email&nbsp;:</label>
            <input
                type="text"
                name="email"
                id="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <br />
            <div className="error" id="email-error"></div>
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
            <div className="error" id="password-error"></div>

            <button type="submit">S'inscrire</button>
        </form>
    );
};

export default Signup;