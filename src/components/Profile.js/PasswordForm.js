import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import zxcvbn from 'zxcvbn';
import { updatePassword } from '../../utils/axiosServices';

const PasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordStrength, setNewPasswordStrength] = useState(0);
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
        setNewPasswordStrength(zxcvbn(newPassword).score);
        setNewPasswordIsOk(zxcvbn(newPassword).score > 2 && newPassword === repeatPassword);
    }, [newPassword, repeatPassword]);

    return (
        <form action=""
                className="change-password"
                onSubmit={e => handleFormSubmit(e)} >
                    
                <h2>Modifier votre mot de passe</h2>

                <p>{ResultMessage}</p>

                <label htmlFor="current">Mot de passe actuel</label>
                <input type="password"
                    name="current" id="current"
                    onChange={e => setCurrentPassword(e.target.value)}
                    value={currentPassword} />
                <br />

                <label htmlFor="new">Nouveau mot de passe</label>
                <input type="password"
                    name="new" id="new"
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword} />
                <span>Force du mot de passe : {newPasswordStrength}/4</span>
                <br />

                <label htmlFor="repeat">Réécrire le nouveau mot de passe</label>
                <input type="password"
                    name="repeat" id="repeat"
                    onChange={e => setRepeatPassword(e.target.value)}
                    value={repeatPassword} />
                <br />
                
                <button type="submit" disabled={!newPasswordIsOk} >Envoyer</button>
            </form>
    );
};

export default PasswordForm;