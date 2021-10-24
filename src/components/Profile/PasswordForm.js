import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import zxcvbn from 'zxcvbn';
import { updatePassword } from '../../utils/axiosServices';

const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [newPasswordIsOk, setNewPasswordIsOk] = useState(false);
    const [ResultMessage, setResultMessage] = useState(null);

    const handleFormSubmit = async e => {
        try {
            e.preventDefault();
            await updatePassword(currentPassword, newPassword);
            setResultMessage('Mot de passe modifié');
        } catch (error) {
            setResultMessage(error);
        } finally {
            setCurrentPassword('');
            setNewPassword('');
            setRepeatPassword('');
        }
    }

    useEffect(() => {
        setNewPasswordIsOk(zxcvbn(newPassword).score > 2 && newPassword === repeatPassword);
    }, [newPassword, repeatPassword]);

    return (
        <form action=""
            className="form"
            onSubmit={e => handleFormSubmit(e)} >

            <h2>Modifier votre mot de passe</h2>

            <label htmlFor="current">Mot de passe actuel&nbsp;:</label>
            <input type="password"
                name="current" id="current"
                onChange={e => setCurrentPassword(e.target.value)}
                value={currentPassword} />

            <label htmlFor="new">Nouveau mot de passe&nbsp;:</label>
            <input type="password"
                name="new" id="new"
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword} />

            <label htmlFor="repeat">Réécrire le nouveau mot de passe&nbsp;:</label>
            <input type="password"
                name="repeat" id="repeat"
                onChange={e => setRepeatPassword(e.target.value)}
                value={repeatPassword} />

            <button type="submit" className="btn btn--red btn--centered" disabled={!newPasswordIsOk} >
                <i className="fas fa-paper-plane"></i> Envoyer
            </button>

            {!!ResultMessage &&
                <p className="result-message">{ResultMessage}</p>
            }
        </form>
    );
};

export default PasswordForm;