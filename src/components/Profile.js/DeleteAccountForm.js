import React, { useState } from 'react';
import { deleteAccount } from '../../utils/axiosServices';

const DeleteAccountForm = props => {
    const { handleLogout } = props;
    const [password, setPassword] = useState('');
    const [resultMessage, setResultMessage] = useState(null);

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            await deleteAccount(password);
            setResultMessage('Compte supprimé');
            handleLogout();
        } catch (error) {
            console.log(error);
            setResultMessage(error);
            setPassword('');
        }
    }

    return (
        <form action=""
            className="delete-account"
            onSubmit={e => handleSubmit(e)} >

            <h2>Supprimer votre compte</h2>

            <p>Attention ! Cette opération est définitive !</p>

            <label htmlFor="password">Mot de passe&nbsp;:</label>
            <input type="password"
                name="password" id="password"
                onChange={e => setPassword(e.target.value)}
                value={password} />
            <br />

            <p>{resultMessage}</p>

            <button type="submit">Supprimer</button>
        </form>
    );
};

export default DeleteAccountForm;