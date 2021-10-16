import React, { useEffect, useState } from 'react';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import { isEmail } from 'validator';
import { login, signup } from '../utils/axiosServices';

const Signup = props => {
    const { handleLogin } = props;
    const [email, setEmail] = useState('');
    const [emailIsOk, setEmailIsOk] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordIsOk, setPasswordIsOk] = useState(false);

    useEffect(() => {
        setPasswordStrength(zxcvbn(password, email).score);
        setPasswordIsOk(zxcvbn(password, email).score > 1);
    }, [password]);

    useEffect(() => {
        setEmailIsOk(isEmail(email))
    }, [email]);

    const handleSignUp = async e => {
        e.preventDefault();

        // If no error on signup, the user is logged in
        if (!signup(email, password))
            handleLogin(email, password);
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
            <p>
                Force du mot de passe : {passwordStrength}/4
            </p>

            <button type="submit" disabled={!passwordIsOk || !emailIsOk}>S'inscrire</button>
        </form>
    );
};

export default Signup;