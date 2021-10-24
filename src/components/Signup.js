import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { isEmail } from 'validator';
import { signup } from '../utils/axiosServices';

const Signup = props => {
    const { handleLogin } = props;
    const [email, setEmail] = useState('');
    const [emailIsOk, setEmailIsOk] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordIsOk, setPasswordIsOk] = useState(null);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatIsOk, setPasswordRepeatIsOk] = useState(null);

    useEffect(() => {
        setEmailIsOk(isEmail(email))
    }, [email]);

    useEffect(() => {
        setPasswordIsOk(zxcvbn(password, email).score > 1);
    }, [password, email]);

    useEffect(() => {
        setPasswordRepeatIsOk(password === passwordRepeat);
    }, [password, passwordRepeat]);

    const handleSignUp = async e => {
        e.preventDefault();

        try {
            await signup(email, password);
            await handleLogin(email, password);
        } catch (error) {
            if (error.includes('email')) {
                await setEmailIsOk(false);
                document.getElementById("email-error").innerHTML = error;
            }
            if (error.includes("passe")) {
                await setPasswordIsOk(false);
                document.getElementById("password-error").innerHTML = error;
            }
        }
    }

    return (
        <form action="" className="form form--auth" id="signup-form" onSubmit={handleSignUp}>
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
                <p className="error" id="email-error">Veuillez saisir une adresse email valide</p>
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
                <p className="error" id="password-error">Ce mot de passe est trop faible</p>
            }

            <label htmlFor="passwordRepeat">Réécrire le mot de passe&nbsp;:</label>
            <input
                type="password"
                name="passwordRepeat"
                id="passwordRepeat"
                onChange={e => setPasswordRepeat(e.target.value)}
                value={passwordRepeat}
            />
            {passwordRepeatIsOk === false ?
                <p className="error">Ce mot de passe n'est pas identique au précédent</p>
                : <><br /><br /></>
            }

            <button type="submit"
                className="btn btn--red btn--centered"
                disabled={!passwordIsOk || !emailIsOk || !passwordRepeatIsOk}>
                S'inscrire
            </button>
        </form>
    );
};

export default Signup;