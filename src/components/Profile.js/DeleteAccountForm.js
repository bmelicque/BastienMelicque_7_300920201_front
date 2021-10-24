import React, { useState } from 'react';
import { deleteAccount } from '../../utils/axiosServices';
import { getCookie } from '../../utils/functions';

const DeleteAccountForm = props => {
    const { handleLogout } = props;
    const [password, setPassword] = useState('');
    const [resultMessage, setResultMessage] = useState(null);
    const userRole = getCookie('role');

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
            className="form"
            onSubmit={e => handleSubmit(e)} >

            <h2>Supprimer votre compte</h2>

            {userRole === 'admin' ?
                <p><strong>Ceci est un compte administrateur. Pour des raisons de sécurité, vous ne pouvez pas le supprimer.</strong></p> :
                <>
                    <p><strong>Attention ! Cette opération est définitive !</strong></p>

                    <label htmlFor="password">Mot de passe&nbsp;:</label>
                    <input type="password"
                        name="password" id="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password} />

                    {resultMessage ?
                        <p>{resultMessage}</p>
                        : null
                    }

                    <button type="submit"
                        className="btn btn--red btn--centered"
                        disabled={!password} >
                        <i className="fas fa-times"></i> Supprimer le compte
                    </button>
                </>}
        </form>
    );
};

export default DeleteAccountForm;