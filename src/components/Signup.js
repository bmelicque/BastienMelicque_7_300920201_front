import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { isEmail } from 'validator';
import { signup } from '../utils/axiosServices';

const Signup = props => {
    const { handleLogin } = props;
    const [email, setEmail] = useState('');
    const [emailIsOk, setEmailIsOk] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordIsOk, setPasswordIsOk] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatIsOk, setPasswordRepeatIsOk] = useState(false);

    useEffect(() => {
        setEmailIsOk(isEmail(email))
    }, [email]);

    useEffect(() => {
        setPasswordIsOk(zxcvbn(password, email).score > 1);
    }, [password]);

    useEffect(() => {
        setPasswordRepeatIsOk(password === passwordRepeat);
    }, [password, passwordRepeat]);

    const handleSignUp = async e => {
        e.preventDefault();

        // If no error on signup, the user is logged in
        if (!(await signup(email, password)))
            await handleLogin(email, password);
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
            {emailIsOk !== false ?
                <><br /><br /></> :
                <p className="error">Veuillez saisir une adresse email valide</p>
            }

            <label htmlFor="password">Mot de passe&nbsp;:</label>
            <input
                type="password"
                name="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            {passwordIsOk !== false ?
                <><br /><br /></> :
                <p className="error">Ce mot de passe est trop faible</p>
            }

            <label htmlFor="passwordRepeat">Réécrire le mot de passe&nbsp;:</label>
            <input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                onChange={e => setPasswordRepeat(e.target.value)}
                value={passwordRepeat}
            />
            {passwordRepeatIsOk !== false ?
                <><br /><br /></> :
                <p className="error">Ce mot de passe n'est pas identique au précédent</p>
            }

            <button type="submit" disabled={!passwordIsOk || !emailIsOk || !passwordRepeatIsOk}>S'inscrire</button>
        </form>
    );
};

export default Signup;