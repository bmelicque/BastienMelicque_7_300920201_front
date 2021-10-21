import React from 'react';
import DeleteAccountForm from './DeleteAccountForm';
import PasswordForm from './PasswordForm';

const Profile = props => {

    return (
        <div className="profile">
            <h1>Votre profil</h1>
            <PasswordForm />
            <DeleteAccountForm
                handleLogout={props.handleLogout} />
        </div>
    );
};

export default Profile;